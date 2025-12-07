// Run all code after the page loads
document.addEventListener('DOMContentLoaded', function () {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // ---------------------------
    // Load tasks from Local Storage
    // ---------------------------
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

        storedTasks.forEach(taskText => {
            addTask(taskText, false); // false → do NOT save again during loading
        });
    }

    // ---------------------------
    // Save tasks to Local Storage
    // ---------------------------
    function saveTasks(tasksArray) {
        localStorage.setItem('tasks', JSON.stringify(tasksArray));
    }

    // ---------------------------
    // Add a new task
    // ---------------------------
    function addTask(taskText, save = true) {

        // If triggered by button/Enter, get taskText from input
        if (!taskText) {
            taskText = taskInput.value.trim();
        }

        // Empty field → alert
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = "remove-btn";

        // Remove task from DOM + Local Storage
        removeBtn.onclick = function () {

            // Remove from DOM
            taskList.removeChild(li);

            // Remove from local storage
            let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks = storedTasks.filter(task => task !== taskText);
            saveTasks(storedTasks);
        };

        // Add remove button to li
        li.appendChild(removeBtn);

        // Add li to list
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = "";

        // Save to Local Storage (if not loading from storage)
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            saveTasks(storedTasks);
        }
    }

    // ---------------------------
    // Event Listeners
    // ---------------------------

    // Add task when clicking the button
    addButton.addEventListener('click', function () {
        addTask();
    });

    // Add task when pressing Enter
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load saved tasks when page opens
    loadTasks();
});
