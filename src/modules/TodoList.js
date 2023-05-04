function saveTaskToLocalStorage(taskData) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskData);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskData => {
        const taskListItem = document.createElement('li');
        taskListItem.classList.add(taskData.priority); // Add class based on priority level
        taskListItem.innerHTML = `
            <div class="task-details">
                <h3>${taskData.title}</h3>
                <p>${taskData.description}</p>
                <p>Due: ${taskData.dueDate}</p>
                <p>Priority: ${taskData.priority}</p>
            </div>
            <button class="delete-btn">Delete</button>
        `;

        const taskList = document.querySelector('#taskList');
        taskList.appendChild(taskListItem);

        taskListItem.addEventListener('click', handleTaskItemClick);
    });
}

function removeTaskFromLocalStorage(taskData) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => JSON.stringify(task) !== JSON.stringify(taskData));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    const taskData = {
        title: document.querySelector('#titleInput').value,
        description: document.querySelector('#descriptionInput').value,
        dueDate: document.querySelector('#dueDateInput').value,
        priority: document.querySelector('#priorityInput').value
    };
    
    saveTaskToLocalStorage(taskData);
    
    const taskListItem = document.createElement('li');
    taskListItem.classList.add(taskData.priority); // Add class based on priority level
    taskListItem.innerHTML = `
    <div class="task-details">
    <h3>${taskData.title}</h3>
    <p>${taskData.description}</p>
    <p>Due: ${taskData.dueDate}</p>
    <p>Priority: ${taskData.priority}</p>
  </div>
  <button class="delete-btn">Delete</button>
`;
    
    const taskList = document.querySelector('#taskList');
    taskList.appendChild(taskListItem);
    
    closeAddTaskPopup();
    
    taskListItem.addEventListener('click', handleTaskItemClick);
}

function handleTaskItemClick(event) {
    if (event.target.classList.contains('delete-btn')) {
        const taskData = {
            title: event.target.previousElementSibling.querySelector('h3').textContent,
            description: event.target.previousElementSibling.querySelector('p:nth-of-type(1)').textContent,
            dueDate: event.target.previousElementSibling.querySelector('p:nth-of-type(2)').textContent.substring(5),
            priority: event.target.previousElementSibling.querySelector('p:nth-of-type(3)').textContent.substring(10)
        };
        removeTaskFromLocalStorage(taskData);
        event.target.parentElement.remove();
    }
}

loadTasksFromLocalStorage();

const addTaskBtn = document.querySelector('#addTaskBtn');
const addTaskPopup = document.querySelector('#addTaskPopup');

const cancelAddTaskBtn = document.querySelector('#cancelAddTaskBtn');
cancelAddTaskBtn.addEventListener('click', closeAddTaskPopup);

addTaskBtn.addEventListener('click', () => {
    addTaskPopup.style.display = 'block';
});

const addTaskForm = document.querySelector('#addTaskForm');
addTaskForm.addEventListener('submit', handleFormSubmit);

function closeAddTaskPopup() {
    addTaskPopup.style.display = 'none';
    addTaskForm.reset();
}