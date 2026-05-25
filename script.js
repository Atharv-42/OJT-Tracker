const STORAGE_KEY = "ojt_learning_tasks";

let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const taskList = document.getElementById("taskList");
const addTaskBtn = document.getElementById("addTaskBtn");

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function showDate() {
  const today = new Date();

  document.getElementById("todayDate").innerText =
    today.toDateString();
}

function getBadge(status) {

  if (status === "Pending") {
    return `<span class="badge pending">Pending</span>`;
  }

  if (status === "In Progress") {
    return `<span class="badge in-progress">In Progress</span>`;
  }

  return `<span class="badge complete">Complete</span>`;
}

function renderTasks() {

  taskList.innerHTML = "";

  if (tasks.length === 0) {

    taskList.innerHTML = `
      <div class="empty-state">
        No learning tasks added yet
      </div>
    `;

    return;
  }

  tasks
    .slice()
    .reverse()
    .forEach((task, index) => {

      taskList.innerHTML += `

        <div class="task-card">

          <div class="task-header">

            <div>
              <div class="task-title">
                ${task.title}
              </div>

              <div class="task-meta">
                <span>📅 ${task.date}</span>
                <span>📁 ${task.category}</span>
              </div>
            </div>

            ${getBadge(task.status)}

          </div>

          <div class="task-actions">

            <select
              class="status-select"
              onchange="updateStatus(${index}, this.value)"
            >
              <option value="Pending"
                ${task.status === "Pending" ? "selected" : ""}>
                Pending
              </option>

              <option value="In Progress"
                ${task.status === "In Progress" ? "selected" : ""}>
                In Progress
              </option>

              <option value="Complete"
                ${task.status === "Complete" ? "selected" : ""}>
                Complete
              </option>
            </select>

            <button
              class="delete-btn"
              onclick="deleteTask(${index})"
            >
              Delete
            </button>

          </div>

        </div>
      `;
    });
}

function addTask() {

  const title = document.getElementById("taskTitle").value;
  const date = document.getElementById("taskDate").value;
  const category = document.getElementById("taskCategory").value;
  const status = document.getElementById("taskStatus").value;

  if (!title || !date) {
    alert("Please fill all required fields");
    return;
  }

  tasks.push({
    title,
    date,
    category,
    status
  });

  saveTasks();
  renderTasks();

  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDate").value = "";
  document.getElementById("taskCategory").value = "Development";
  document.getElementById("taskStatus").value = "Pending";
}

function updateStatus(index, status) {

  const reversedTasks = [...tasks].reverse();
  const task = reversedTasks[index];

  const actualIndex = tasks.findIndex(
    t => t.title === task.title && t.date === task.date
  );

  tasks[actualIndex].status = status;

  saveTasks();
  renderTasks();
}

function deleteTask(index) {

  const reversedTasks = [...tasks].reverse();
  const task = reversedTasks[index];

  const actualIndex = tasks.findIndex(
    t => t.title === task.title && t.date === task.date
  );

  tasks.splice(actualIndex, 1);

  saveTasks();
  renderTasks();
}

addTaskBtn.addEventListener("click", addTask);

showDate();
renderTasks();