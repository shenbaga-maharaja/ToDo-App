document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    let todos = [];

    // Function to render the todo list
    const renderTodos = () => {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const listItem = document.createElement('li');
            listItem.className = `list-group-item d-flex justify-content-between align-items-center ${todo.editing ? 'edit-mode' : ''}`;
            listItem.innerHTML = `
                ${todo.editing ? `<input type="text" class="form-control" value="${todo.text}">` : `<span>${todo.text}</span>`}
                <div class="d-flex">
                    ${todo.editing ? `
                        <button class="btn btn-success btn-sm mx-2 save-btn">Save</button>
                        <button class="btn btn-secondary btn-sm cancel-btn">Cancel</button>
                    ` : `
                        <button class="btn btn-warning btn-sm mx-2 edit-btn">Edit</button>
                        <button class="btn btn-danger btn-sm delete-btn">Delete</button>
                    `}
                </div>
            `;

            // Edit button event
            listItem.querySelector('.edit-btn')?.addEventListener('click', () => {
                todos = todos.map((t, i) => i === index ? { ...t, editing: true } : t);
                renderTodos();
            });

            // Delete button event
            listItem.querySelector('.delete-btn')?.addEventListener('click', () => {
                todos = todos.filter((_, i) => i !== index);
                renderTodos();
            });

            // Save button event
            listItem.querySelector('.save-btn')?.addEventListener('click', () => {
                const input = listItem.querySelector('input').value;
                todos = todos.map((t, i) => i === index ? { text: input, editing: false } : t);
                renderTodos();
            });

            // Cancel button event
            listItem.querySelector('.cancel-btn')?.addEventListener('click', () => {
                todos = todos.map((t, i) => i === index ? { ...t, editing: false } : t);
                renderTodos();
            });

            todoList.appendChild(listItem);
        });
    };

    // Handle form submit
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = todoInput.value.trim();
        if (text) {
            todos.push({ text, editing: false });
            todoInput.value = '';
            renderTodos();
        }
    });

    // Initial render
    renderTodos();
});
