document.addEventListener('DOMContentLoaded', function () {
    const todoListContainer = document.getElementById('todo-list');
    const addTodoForm = document.getElementById('add-todo-form');
    const todoDescriptionInput = document.getElementById('todo-description');
  
    // Function to fetch and display todos
    function fetchTodos() {
      fetch('/todos')
        .then(response => response.json())
        .then(todos => {
          todoListContainer.innerHTML = '';
          todos.forEach(todo => {
            const todoItem = document.createElement('div');
            todoItem.classList.add('todo-item');
            if (todo.completed) {
              todoItem.classList.add('completed');
            }
            todoItem.innerHTML = `
              <input type="checkbox" id="todo-${todo.id}" ${todo.completed ? 'checked' : ''}>
              <label for="todo-${todo.id}">${todo.description}</label>
            `;
            todoItem.querySelector('input').addEventListener('change', () => {
              updateTodoStatus(todo.id, !todo.completed);
            });
            todoListContainer.appendChild(todoItem);
          });
        })
        .catch(error => console.error('Error fetching todos:', error));
    }
  
    // Function to add a new todo
    function addTodo(description) {
      fetch('/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description })
      })
      .then(response => response.json())
      .then(() => {
        fetchTodos();
        todoDescriptionInput.value = '';
      })
      .catch(error => console.error('Error adding todo:', error));
    }
  
    // Function to update todo status
    function updateTodoStatus(id, completed) {
      fetch(`/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed })
      })
      .then(response => response.json())
      .then(() => fetchTodos())
      .catch(error => console.error('Error updating todo status:', error));
    }
  
    // Fetch todos when the page loads
    fetchTodos();
  
    // Add event listener for submitting the add todo form
    addTodoForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const description = todoDescriptionInput.value.trim();
      if (description) {
        addTodo(description);
      }
    });
  });
  