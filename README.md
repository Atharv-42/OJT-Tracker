# OJT Progress Tracker

A clean, responsive web application for students to manage and track daily On-the-Job Training (OJT) activities — no frameworks, no build tools, just HTML5, CSS3, and Vanilla JavaScript.

---

## Features

- **Task Management** — Add tasks with a title, category, due date, and status
- **Status Options** — Pending, In Progress, Completed
- **Task Actions** — Mark complete or delete any task
- **Dashboard Summary** — Live counts of total, pending, in-progress, and completed tasks with a progress bar
- **Filter & Search** — Filter by status tab; search by title or category
- **Overdue Indicator** — Past-due dates are highlighted in red
- **Daily Notes** — Three tabs: Learnings, Mentor Feedback, Error Log (Ctrl+S to save)
- **LocalStorage** — All data persists across page refreshes automatically
- **Fully Responsive** — Works on desktop, tablet, and mobile

---

## Project Structure

```
ojt-progress-tracker/
├── index.html     # App structure and markup
├── style.css      # All styling (dark theme, responsive)
├── script.js      # All functionality (CRUD, storage, UI)
└── README.md      # This file


## Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 (custom properties, grid, flexbox, animations) |
| Logic | Vanilla JavaScript (ES6+) |
| Persistence | LocalStorage API |
| Fonts | Google Fonts — Syne + DM Sans |
