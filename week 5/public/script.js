document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
    fetch('/api/tasks')
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = ''; // Clear previous tasks

            tasks.forEach((task, index) => {
                const li = document.createElement('li');
                li.innerHTML = `${task} <button onclick="removeTask(${index})">❌</button>`;
                taskList.appendChild(li);
            });
        });
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();
    
    if (task) {
        fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task })
        })
        .then(() => {
            taskInput.value = '';
            loadTasks(); // Refresh task list
        });
    }
}

function removeTask(index) {
    fetch(`/api/tasks/${index}`, { method: 'DELETE' })
        .then(() => loadTasks()); // Refresh task list
}