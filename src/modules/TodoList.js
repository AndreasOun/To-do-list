const addTaskBtn = document.querySelector('#addTaskBtn');
const addTaskPopup = document.querySelector('#addTaskPopup');

addTaskBtn.addEventListener('click', () => {
    addTaskPopup.style.display = 'block';
});

const addTaskForm = document.querySelector('#addTaskForm');
addTaskForm.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
    event.preventDefault();
    
    const taskData = {
        title: document.querySelector('#titleInput').value,
        description: document.querySelector('#descriptionInput').value,
        dueDate: document.querySelector('#dueDateInput').value,
        priority: document.querySelector('#priorityInput').value
    };
    
    const taskListItem = document.createElement('li');
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

function closeAddTaskPopup() {
    addTaskPopup.style.display = 'none';
    addTaskForm.reset();
}

function handleTaskItemClick(event) {
    if (event.target.classList.contains('delete-btn')) {
        event.target.parentElement.remove();
    }
}