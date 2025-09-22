document.addEventListener("DOMContentLoaded", function () {
    // Get references to DOM elements
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Load tasks from localStorage if available
    loadTasks();

    // Add task event listener
    addTaskBtn.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            taskInput.value = ""; // Clear input field
        }
    });

    // Add task to the list and save to localStorage
    function addTask(text) {
        const task = {
            id: new Date().getTime(),
            text: text
        };

        // Create task element
        const taskElement = document.createElement("li");
        taskElement.classList.add("list-group-item");
        taskElement.dataset.id = task.id; // Set the id for the task
        taskElement.innerHTML = `
            <span>${task.text}</span>
            <button class="btn btn-warning btn-sm float-end mx-2 edit-btn">Edit</button>
            <button class="btn btn-danger btn-sm float-end delete-btn">Delete</button>
        `;

        // Append to task list
        taskList.appendChild(taskElement);

        // Save task to localStorage
        saveTask(task);
    }

    // Delete task by ID
    taskList.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete-btn")) {
            const taskElement = e.target.closest("li");
            const taskId = taskElement.dataset.id;
            taskElement.remove();
            removeTaskFromStorage(taskId);
        }
    });

    // Edit task by ID
    taskList.addEventListener("click", function (e) {
        if (e.target.classList.contains("edit-btn")) {
            const taskElement = e.target.closest("li");
            const taskId = taskElement.dataset.id;
            const newText = prompt("Edit your task:", taskElement.querySelector("span").textContent);
            if (newText !== null) {
                taskElement.querySelector("span").textContent = newText;
                updateTaskInStorage(taskId, newText);
            }
        }
    });

    // Save task to localStorage
    function saveTask(task) {
        const tasks = getTasksFromStorage();
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Remove task from localStorage
    function removeTaskFromStorage(taskId) {
        const tasks = getTasksFromStorage();
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }

    // Update task in localStorage
    function updateTaskInStorage(taskId, newText) {
        const tasks = getTasksFromStorage();
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, text: newText } : task
        );
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }

    // Get tasks from localStorage
    function getTasksFromStorage() {
        const tasks = localStorage.getItem("tasks");
        return tasks ? JSON.parse(tasks) : [];
    }

    // Load tasks from localStorage on page load
    function loadTasks() {
        const tasks = getTasksFromStorage();
        tasks.forEach(task => {
            const taskElement = document.createElement("li");
            taskElement.classList.add("list-group-item");
            taskElement.dataset.id = task.id; // Set the id for the task
            taskElement.innerHTML = `
                <span>${task.text}</span>
                <button class="btn btn-warning btn-sm float-end mx-2 edit-btn">Edit</button>
                <button class="btn btn-danger btn-sm float-end delete-btn">Delete</button>
            `;
            taskList.appendChild(taskElement);
        });
    }
});