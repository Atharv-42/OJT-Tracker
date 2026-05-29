**OJT Progress Tracker**

Simple, framework-free web app to track On-the-Job Training (OJT) tasks and daily notes. Built with plain HTML, CSS, and JavaScript so you can run it without build tools.

**Quick Start**

- Open the app in your browser by double-clicking [index.html](index.html).
- Or run the included Node server (requires Node.js):

```powershell
npm install
node server.js
```

**Features**

- Task CRUD: create, edit, delete tasks with title, category, due date, and status.
- Statuses: Pending, In Progress, Completed.
- Dashboard: live counts and progress visualization.
- Search & filter tasks by title, category, or status.
- Overdue highlighting for past-due tasks.
- Daily notes sections (Learnings, Mentor Feedback, Error Log) with quick save.
 - Daily notes sections (Learnings, Mentor Feedback, Error Log) with quick save.
 - Data persists on the server in MongoDB (via the Node/Express API).

**Project Structure**

- [index.html](index.html) — main HTML page
- [style.css](style.css) — styles and responsive layout
- [script.js](script.js) — application logic and storage handling
- [server.js](server.js) — optional Node static server
- [package.json](package.json) — project metadata and deps
- [models/](models/) — data model helpers
- [screenshots/](screenshots/) — example images

**Tech**

- HTML5, CSS3, Vanilla JavaScript (ES6+)
- Node.js + Express backend with MongoDB (Mongoose)

**Server & Database**

- The app uses an Express API (see `server.js`) and stores data in MongoDB using `mongoose` models in the `models/` directory.
- Default local MongoDB URI: `mongodb://127.0.0.1:27017/ojt_progress_tracker` (change with `MONGODB_URI`).

**Environment**

Create a `.env` file in the project root to override the MongoDB URI or server port, for example:

```
MONGODB_URI=mongodb://127.0.0.1:27017/ojt_progress_tracker
PORT=3000
```

**API Endpoints**

- `GET /api/tasks` — list tasks
- `POST /api/tasks` — create a task (JSON body: `title`, `category`, `dueDate`, `status`)
- `PATCH /api/tasks/:id` — update task fields
- `DELETE /api/tasks/:id` — delete a task
- `GET /api/notes` — get daily notes (auto-creates default doc)
- `PUT /api/notes` — replace notes (JSON body: `learnings`, `feedback`, `errors`)

