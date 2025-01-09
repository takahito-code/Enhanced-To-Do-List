const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task-button");
const taskList = document.getElementById("task-list");
const allFilter = document.getElementById("all-filter");
const toDoFilter = document.getElementById("active-filter");
const doneFilter = document.getElementById("completed-filter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// 保存
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 描画
function renderTasks(filter = "all") {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    if (filter === "toDo" && task.completed) return;
    if (filter === "done" && !task.completed) return;

    const li = document.createElement("li");
    li.textContent = task.text;
    li.className = task.completed ? "done" : "to-do";

    // 状態切り替えボタン
    const toggleButton = document.createElement("button");
    toggleButton.textContent = task.completed ? "Done" : "To Do";
    toggleButton.className = task.completed ? "done-btn" : "to-do-btn";
    toggleButton.addEventListener("click", () => toggleTask(index));

    // 削除ボタン
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-btn";
    deleteButton.addEventListener("click", () => deleteTask(index));

    li.appendChild(toggleButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

// タスク追加
addTaskButton.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = "";
  } else {
    alert("Please enter a valid task.");
  }
});

// 状態切り替え
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// 削除
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// フィルタリング
allFilter.addEventListener("click", () => renderTasks("all"));
toDoFilter.addEventListener("click", () => renderTasks("toDo"));
doneFilter.addEventListener("click", () => renderTasks("done"));

// 初期表示
renderTasks();