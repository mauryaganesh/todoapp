let todoItemsContainer = document.getElementById('todoItemsContainer');
let saveTodoButton = document.getElementById('saveTodoButton');
let addTodoButton = document.getElementById('addTodoButton');

function getTodoListFromLocalStorage() {
  let stringifiedTodoList = localStorage.getItem('todoList');
  let parsedTodoList = JSON.parse(stringifiedTodoList);

  // If Keys are not present in localStorage
  if (parsedTodoList === null) {
    return [];
  } else {
    return parsedTodoList;
  }
}

let todoList = getTodoListFromLocalStorage();
let todoLength = todoList.length;

saveTodoButton.onclick = function () {
  localStorage.setItem('todoList', JSON.stringify(todoList));
};

// Adding a new Todo Item on User Input
function onAddTodo() {
  let userInputElement = document.getElementById('todoUserInput');
  let userInputElementValue = userInputElement.value;
  let todoCount = todoLength + 1;

  // Showing Warning Message
  if (userInputElementValue === '') {
    alert('Enter Valid text');
    return;
  }

  let newTodo = {
    text: userInputElementValue,
    uniqueNo: todoCount,
    isChecked: false,
  };
  todoList.push(newTodo);
  createAndAppendTodo(newTodo);
  userInputElement.value = '';
  todoLength++;
}

// Adding Event Listener to the add button
addTodoButton.onclick = function () {
  onAddTodo();
};

function onDeleteTodo(todoId) {
  let todoElement = document.getElementById(todoId);
  todoItemsContainer.removeChild(todoElement);
  let deletedTodoItemIndex = todoList.findIndex(function (eachTodo) {
    let eachTodoId = 'todo' + eachTodo.uniqueNo;
    if (eachTodoId === todoId) {
      return true;
    } else {
      return false;
    }
  });
  // console.log(deletedTodoItemIndex);
  todoList.splice(deletedTodoItemIndex, 1);
}

function onTodoStatusChange(checkboxID, labelId, todoId) {
  // let checkboxElement = document.getElementById(checkboxID);
  let labelElement = document.getElementById(labelId);
  labelElement.classList.toggle('checked');

  let todoItemIndex = todoList.findIndex(function (eachTodo) {
    let eachTodoId = 'todo' + eachTodo.uniqueNo;
    if (eachTodoId === todoId) {
      return true;
    } else {
      return false;
    }
  });

  let todoObject = todoList[todoItemIndex];
  if (todoObject.isChecked === true) {
    todoObject.isChecked = false;
  } else {
    todoObject.isChecked = true;
  }
  /* if (checkboxElement.checked === true){
            labelElement.classList.add('checked');
        } else{
            labelElement.classList.remove('checked');
        } */
}

function createAndAppendTodo(todo) {
  let checkboxID = 'checkbox' + todo.uniqueNo;
  let labelId = 'label' + todo.uniqueNo;
  let todoId = 'todo' + todo.uniqueNo;
  let todoElement = document.createElement('li'); //li element creation
  todoElement.classList.add('todo-item-container', 'd-flex', 'flex-row'); //Adding Classes
  todoElement.id = todoId;
  todoItemsContainer.appendChild(todoElement);
  // console.log(todoItemsContainer);

  let inputElement = document.createElement('input');
  inputElement.type = 'checkbox';
  inputElement.id = checkboxID;
  inputElement.checked = todo.isChecked;
  inputElement.classList.add('checkbox-input');
  todoElement.appendChild(inputElement);
  inputElement.onclick = function () {
    onTodoStatusChange(checkboxID, labelId, todoId);
  };
  // console.log(todoItemsContainer);

  // Creating Label Container
  let labelContainer = document.createElement('div');
  labelContainer.classList.add('label-container', 'd-flex', 'flex-row');
  todoElement.appendChild(labelContainer);

  // Creating Label Text
  let labelElement = document.createElement('label');
  labelElement.setAttribute('for', checkboxID);
  labelElement.classList.add('checkbox-label');
  labelElement.textContent = todo.text;
  labelElement.id = labelId;
  if (todo.isChecked === true) {
    labelElement.classList.add('checked');
  }
  labelContainer.appendChild(labelElement);

  let deleteContainer = document.createElement('div');
  deleteContainer.classList.add('delete-icon-container');
  labelContainer.appendChild(deleteContainer);

  let deleteIcon = document.createElement('i');
  deleteIcon.classList.add('far', 'fa-trash-alt', 'delete-icon');
  deleteIcon.onclick = function () {
    onDeleteTodo(todoId);
  };
  labelContainer.appendChild(deleteIcon); /// Clear confusion b/w labelContainer or deleteContainer
}

for (let todo of todoList) {
  createAndAppendTodo(todo);
}
