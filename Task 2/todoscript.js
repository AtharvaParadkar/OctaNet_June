const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskPriority = document.getElementById('task-priority');
const taskDeadline = document.getElementById('task-deadline');
const taskList = document.getElementById('task-list');

taskForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    const task = {
        text: taskInput.value,
        priority: taskPriority.value,
        deadline: taskDeadline.value
    };

    createTaskElement(task);
    clearTaskForm();
    sortTasksByPriority();
});

function createTaskElement(task) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('list-item');
    taskItem.innerHTML = `
      <span>Task:${task.text}</span>
      <span>Priority: <button  class="${task.priority}">${task.priority}</button></span>
      <span>Deadline: ${task.deadline}</span>
    `;

    taskList.appendChild(taskItem);
}

function clearTaskForm() {
    taskInput.value = '';
    taskPriority.value = 'low';
    taskDeadline.value = '';
}

function sortTasksByPriority() {
    const tasks = Array.from(taskList.children);
    tasks.sort((a, b) => {
        const priorityA = a.querySelector('span:nth-child(2)').textContent.split(':')[1].trim();
        const priorityB = b.querySelector('span:nth-child(2)').textContent.split(':')[1].trim();

        const deadlineA = a.querySelector('span:nth-child(3)').textContent.split(':')[1].trim();
        const deadlineB = b.querySelector('span:nth-child(3)').textContent.split(':')[1].trim();

        // Assign priority values for sorting (adjust as needed)
        const priorityValues = {
            low: 1,
            medium: 2,
            high: 3
        };

        if (priorityA !== priorityB) {
            return priorityValues[priorityB] - priorityValues[priorityA];
        } else {
            // Sort by deadline if priorities are the same
            return new Date(deadlineA) - new Date(deadlineB);
        }
    });


    // Remove existing tasks from the list
    while (taskList.firstChild) {
        taskList.firstChild.remove();
    }

    // Append sorted tasks to the list
    tasks.forEach(task => {
        taskList.appendChild(task);
    });
}