let tasks = [];

window.onload = async () => {
  tasks = (await localforage.getItem("tasks")) || [];
  renderTasks();
};

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  try {
    if (!taskText) throw new Error("Task cannot be empty");

    tasks.push({ text: taskText, completed: false });
    input.value = "";
    saveAndRender();
  } catch (err) {
    alert(err.message);
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveAndRender();
}

function removeTask(index) {
  tasks.splice(index, 1);
  saveAndRender();
}

function saveAndRender() {
  localforage.setItem("tasks", tasks);
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <span onclick="toggleTask(${index})">${task.text}</span>
      <button class="remove" onclick="removeTask(${index})">X</button>
    `;

    list.appendChild(li);
  });
}
