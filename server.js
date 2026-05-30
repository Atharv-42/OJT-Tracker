const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const Task = require("./models/Task");
const Notes = require("./models/Notes");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ojt_progress_tracker";

app.use(express.json());
app.use(express.static(__dirname));

function normalizeTask(task) {
  return {
    id: task._id.toString(),
    title: task.title,
    category: task.category,
    dueDate: task.dueDate || "",
    status: task.status,
    createdAt: task.createdAt,
  };
}

function normalizeNotes(notesDoc) {
  return {
    learnings: notesDoc.learnings || "",
    feedback: notesDoc.feedback || "",
    noteErrors: notesDoc.errors || notesDoc.noteErrors || "",
  };
}

async function migrateLegacyNotesFields(notesDoc) {
  const rawNotesDoc = await Notes.collection.findOne({ _id: notesDoc._id });
  if (rawNotesDoc?.noteErrors && !rawNotesDoc.errors) {
    await Notes.collection.updateOne(
      { _id: notesDoc._id },
      {
        $set: { errors: rawNotesDoc.noteErrors },
        $unset: { noteErrors: "" },
      }
    );
  }
}

function asyncRoute(handler) {
  return (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
}

app.get(
  "/api/health",
  asyncRoute(async (req, res) => {
    res.json({ status: "ok" });
  })
);

app.get(
  "/api/tasks",
  asyncRoute(async (req, res) => {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks.map(normalizeTask));
  })
);

app.post(
  "/api/tasks",
  asyncRoute(async (req, res) => {
    const { title, category = "Other", dueDate = "", status = "Pending" } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: "Task title is required." });
    }

    const task = await Task.create({
      title: title.trim(),
      category,
      dueDate,
      status,
    });

    res.status(201).json(normalizeTask(task));
  })
);

app.patch(
  "/api/tasks/:id",
  asyncRoute(async (req, res) => {
    const updates = {};
    const allowedFields = ["title", "category", "dueDate", "status"];

    for (const field of allowedFields) {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        updates[field] = req.body[field];
      }
    }

    if (Object.prototype.hasOwnProperty.call(updates, "title") && !updates.title.trim()) {
      return res.status(400).json({ error: "Task title cannot be empty." });
    }

    if (updates.title) {
      updates.title = updates.title.trim();
    }

    const task = await Task.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!task) {
      return res.status(404).json({ error: "Task not found." });
    }

    res.json(normalizeTask(task));
  })
);

app.delete(
  "/api/tasks/:id",
  asyncRoute(async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found." });
    }

    res.status(204).send();
  })
);

app.get(
  "/api/notes",
  asyncRoute(async (req, res) => {
    const notesDoc = await Notes.findOneAndUpdate(
      { key: "daily-notes" },
      { $setOnInsert: { key: "daily-notes" } },
      { new: true, upsert: true }
    );

    await migrateLegacyNotesFields(notesDoc);

    res.json(normalizeNotes(notesDoc));
  })
);

app.put(
  "/api/notes",
  asyncRoute(async (req, res) => {
    const { learnings = "", feedback = "", noteErrors = "" } = req.body;

    const notesDoc = await Notes.findOneAndUpdate(
      { key: "daily-notes" },
      {
        $set: { key: "daily-notes", learnings, feedback, errors: noteErrors },
        $unset: { noteErrors: "" },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json(normalizeNotes(notesDoc));
  })
);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: "Internal server error." });
});

async function start() {
  try {
    await mongoose.connect(MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
}

start();