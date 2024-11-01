document.addEventListener('DOMContentLoaded', function () {
    let isEditMode = false;
    let edittingId;
    const tasks = [
        {
            id: 1,
            title: "Complete project report",
            description: "Prepare and submit the project report",
            dueDate: "2024-12-01",
            comments: []
        },
        {
            id: 2,
            title: "Team Meeting",
            description: "Get ready for the season",
            dueDate: "2024-12-01",
            comments: []
        },
        {
            id: 3,
            title: "Code Review",
            description: "Check partners code",
            dueDate: "2024-12-01",
            comments: []
        },
        {
            id: 4,
            title: "Deploy",
            description: "Check deploy steps",
            dueDate: "2024-12-01",
            comments: []
        }
    ];

    function loadTasks() {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        tasks.forEach(function (task) {
            const taskCard = document.createElement('div');
            taskCard.className = 'col-md-4 mb-3';
            taskCard.innerHTML = `
                <div class="card" data-task-id="${task.id}">
                    <div class="card-body">
                        <h5 class="card-title">${task.title}</h5>
                        <p class="card-text">${task.description}</p>
                        <p class="card-text"><small class="text-muted">Due: ${task.dueDate}</small></p>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button class="btn btn-secondary btn-sm edit-task" data-id="${task.id}">Edit</button>
                        <button class="btn btn-danger btn-sm delete-task" data-id="${task.id}">Delete</button>
                    </div>
                    <div class="comments-section p-3 mt-3"> <!-- Se agregó "p-3" para padding -->
                        <h6>Comments</h6>
                        <ul class="list-group comment-list">
                            ${task.comments.map((comment, index) => `
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    ${comment}
                                    <button class="btn btn-sm btn-outline-danger delete-comment-btn" data-task-id="${task.id}" data-comment-index="${index}">Delete</button>
                                </li>`).join('')}
                        </ul>
                        <div class="input-group mt-2">
                            <input type="text" class="form-control comment-input" placeholder="Add a comment...">
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary add-comment-btn" data-task-id="${task.id}" type="button">Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            taskList.appendChild(taskCard);
        });
    
        document.querySelectorAll('.add-comment-btn').forEach(button => {
            button.addEventListener('click', handleAddComment);
        });
    
        document.querySelectorAll('.delete-comment-btn').forEach(button => {
            button.addEventListener('click', handleDeleteComment);
        });
    
        document.querySelectorAll('.edit-task').forEach(button => {
            button.addEventListener('click', handleEditTask);
        });
    
        document.querySelectorAll('.delete-task').forEach(button => {
            button.addEventListener('click', handleDeleteTask);
        });
    }
    

    function handleAddComment(event) {
        const taskId = parseInt(event.target.dataset.taskId);
        const task = tasks.find(t => t.id === taskId);
        const commentInput = event.target.closest('.input-group').querySelector('.comment-input');
        const commentText = commentInput.value.trim();

        if (commentText) {
            task.comments.push(commentText);
            commentInput.value = ''; // Limpia el campo de entrada
            loadTasks(); // Actualiza la vista de comentarios
        }
    }

    function handleDeleteComment(event) {
        const taskId = parseInt(event.target.dataset.taskId);
        const commentIndex = parseInt(event.target.dataset.commentIndex);
        const task = tasks.find(t => t.id === taskId);

        task.comments.splice(commentIndex, 1); // Elimina el comentario
        loadTasks(); // Actualiza la vista de comentarios
    }

    function handleEditTask(event) {
        const taskId = parseInt(event.target.dataset.id);
        const task = tasks.find(t => t.id === taskId);
        
        document.getElementById('task-title').value = task.title;
        document.getElementById('task-desc').value = task.description;
        document.getElementById('due-date').value = task.dueDate;

        isEditMode = true;
        edittingId = taskId;
        
        const modal = new bootstrap.Modal(document.getElementById("taskModal"));
        modal.show();
    }

    function handleDeleteTask(event) {
        const id = parseInt(event.target.dataset.id);
        const index = tasks.findIndex(t => t.id === id);
        tasks.splice(index, 1);
        loadTasks();
    }

    document.getElementById('task-form').addEventListener('submit', function (e) {
        e.preventDefault();
        
        const title = document.getElementById("task-title").value;
        const description = document.getElementById("task-desc").value;
        const dueDate = document.getElementById("due-date").value;

        if (isEditMode) {
            const task = tasks.find(t => t.id === edittingId);
            task.title = title;
            task.description = description;
            task.dueDate = dueDate;
        } else {
            const newTask = {
                id: tasks.length + 1,
                title: title,
                description: description,
                dueDate: dueDate,
                comments: []
            };
            tasks.push(newTask);
        }

        loadTasks();
        
        document.getElementById("task-form").reset();
        isEditMode = false;
        const modal = bootstrap.Modal.getInstance(document.getElementById("taskModal"));
        modal.hide();
    });

    loadTasks();
});

