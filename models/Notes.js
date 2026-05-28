const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: "daily-notes",
    },
    learnings: {
      type: String,
      default: "",
    },
    feedback: {
      type: String,
      default: "",
    },
    errors: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notes", notesSchema);