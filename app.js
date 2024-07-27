document.addEventListener('DOMContentLoaded', loadTasks);
document.querySelector('#task-form').addEventListener('submit', addTask);
document.querySelector('#task-list').addEventListener('click', modifyTask);

function addTask(e) {
    e.preventDefault();

    const taskInput = document.querySelector('#task-input');
    const task = taskInput.value.trim();

    if (task === '') {
        alert('Please add a task');
        return;
    }

    const li = document.createElement('li');
    li.appendChild(document.createTextNode(task));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    li.appendChild(deleteBtn);

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    li.appendChild(editBtn);

    document.querySelector('#task-list').appendChild(li);

    storeTaskInLocalStorage(task);

    taskInput.value = '';
}

function modifyTask(e) {
    if (e.target.textContent === 'Delete') {
        if (confirm('Are you sure?')) {
            e.target.parentElement.remove();
            removeTaskFromLocalStorage(e.target.parentElement);
        }
    } else if (e.target.textContent === 'Edit') {
        const li = e.target.parentElement;
        const newTask = prompt('Edit your task', li.firstChild.textContent);

        if (newTask && newTask.trim() !== '') {
            li.firstChild.textContent = newTask;
            updateTaskInLocalStorage(li, newTask);
        }
    }
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks = tasks.filter(task => task !== taskItem.firstChild.textContent);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskInLocalStorage(taskItem, newTask) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    const oldTask = taskItem.firstChild.textContent;
    const index = tasks.indexOf(oldTask);
    if (index !== -1) {
        tasks[index] = newTask;
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(task));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        li.appendChild(deleteBtn);

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        li.appendChild(editBtn);

        document.querySelector('#task-list').appendChild(li);
    });
}