// app.js - Controlador de la aplicación Task Manager

// Seleccionamos elementos DOM que usaremos para interactuar
const taskForm = document.getElementById('task-form');    // Formulario de nueva tarea
const taskInput = document.getElementById('task-input');  // Campo para escribir nueva tarea
const taskList = document.getElementById('task-list');    // Lista donde mostramos tareas

// Clave para guardar en localStorage
const STORAGE_KEY = 'karla_tasks';

// Cargamos tareas guardadas en localStorage, o inicializamos array vacío
let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// Función para renderizar la lista de tareas en el DOM
function renderTasks() {
  // Primero limpiamos el listado
  taskList.innerHTML = '';

  // Recorremos las tareas
  tasks.forEach((task, index) => {
    // Creamos elemento <li>
    const li = document.createElement('li');

    // Añadimos clase si está completada
    if (task.completed) li.classList.add('completed');

    // Añadimos el texto de la tarea
    li.textContent = task.text;

    // Creamos botón para marcar como completada
    const completeBtn = document.createElement('button');
    completeBtn.setAttribute('aria-label', `Marcar tarea "${task.text}" como completada`);
    completeBtn.innerHTML = '✔️';
    completeBtn.addEventListener('click', () => toggleTask(index));

    // Creamos botón para eliminar tarea
    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('aria-label', `Eliminar tarea "${task.text}"`);
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.addEventListener('click', () => deleteTask(index));

    // Añadimos los botones al <li>
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    // Añadimos la tarea a la lista en el DOM
    taskList.appendChild(li);
  });
}

// Función para agregar una tarea nueva
function addTask(text) {
  tasks.push({ text: text.trim(), completed: false });
  saveTasks();
  renderTasks();
}

// Función para guardar tareas en localStorage
function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Función para alternar completado/no completado
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Función para eliminar tarea
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Evento submit del formulario
taskForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevenimos recarga de página

  const newTask = taskInput.value;

  // Validamos entrada
  if (!newTask.trim()) return alert('Por favor, escribe una tarea válida.');

  // Añadimos la tarea
  addTask(newTask);

  // Limpiamos el input
  taskInput.value = '';
});

// Renderizamos las tareas al cargar la página
renderTasks();
