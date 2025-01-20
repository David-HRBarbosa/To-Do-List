// script.js

// Seleciona os elementos do DOM
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Carregar tarefas do localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Função para salvar tarefas no localStorage
function saveToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Função para renderizar tarefas
function renderTodos() {
  todoList.innerHTML = ''; // Limpa a lista antes de renderizar
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = todo.completed ? 'completed' : '';
    li.innerHTML = `
      ${todo.text}
      <div>
        <button onclick="toggleComplete(${index})">✔</button>
        <button onclick="deleteTodo(${index})">✖</button>
      </div>
    `;
    todoList.appendChild(li);
  });
}

// Função para adicionar uma nova tarefa
function addTodo(text) {
  todos.push({ text, completed: false });
  saveToLocalStorage();
  renderTodos();
}

// Função para marcar uma tarefa como concluída
function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  saveToLocalStorage();
  renderTodos();
}

// Função para excluir uma tarefa
function deleteTodo(index) {
  todos.splice(index, 1);
  saveToLocalStorage();
  renderTodos();
}

// Evento de submissão do formulário
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const task = todoInput.value.trim();
  if (task) {
    addTodo(task);
    todoInput.value = ''; // Limpa o campo de texto
  }
});

// Renderiza as tarefas ao carregar a página
renderTodos();