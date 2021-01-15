const list = document.querySelector('.lists');
const form = document.querySelector('.--form');
const input = document.querySelector('.input');
const deleteLink = document.querySelector('.delete');
const noDataMessage = document.getElementById('no-data-message');

function removeItems(e){
	if(e.target.classList.contains('delete')){
		const li = e.target.parentElement;
		list.removeChild(li);
		updateToDoList();
	}
}

function addToDo(e) {
	e.preventDefault();
	const text = input.value;
	renderToDo({
		text,
		completed: false,
	});
	noDataMessage.classList.add('hide');
	updateToDoList();
	input.value = '';
}

function toggleTask(e){
	e.target.classList.toggle('completed');
	updateToDoList();
}

function updateToDoList(){
	const todosEl = document.querySelectorAll('li');
	const todos = [];
	if (todosEl.length === 0) {
		noDataMessage.classList.remove('hide');
	} else {
		todosEl.forEach(todoEl =>{
			// Only want to store the todo text and not the span with the "X"
			const text = todoEl.querySelector('.todo-text').innerText;
			todos.push({
					text,
					completed : todoEl.classList.contains('completed')
			})
		})
	}
	localStorage.setItem('tasks', JSON.stringify(todos));
}

function renderToDo(todo) {
	const li = document.createElement('li');
	const deleteElement  = document.createElement('span');
	deleteElement.className = 'delete';
	deleteElement.appendChild(document.createTextNode('x'));
	li.classList.add('items');
	const textElement = document.createElement('span');
	textElement.classList.add('todo-text');
	textElement.appendChild(document.createTextNode(todo.text));
	li.appendChild(textElement);
	li.appendChild(deleteElement);
	li.setAttribute("onclick", "toggleTask(event)");
	if (todo.completed) {
		li.classList.add('completed')
	}
	list.appendChild(li);
}

// On page load check if there are any list items to load
// if there are populate the list
const todos = JSON.parse(localStorage.getItem('tasks'));
if(todos && todos.length) {
	todos.forEach(todo => renderToDo(todo));
} else {
	noDataMessage.classList.remove('hide');
}

form.addEventListener('submit', addToDo);
list.addEventListener('click', removeItems);