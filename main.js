//Selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
todoButton.addEventListener("click", addTodo);

todoList.addEventListener("click", deleteCheck);

filterOption.addEventListener("click", filterTodo);

//Functions

function addTodo(event) {
    //Prevent form from submitting
    event.preventDefault();

    //Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Creates List
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Add exsisting todos to local storage
    saveLocalTodos(todoInput.value);
    
    //Complete button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    //Trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //Append to list
    todoList.appendChild(todoDiv);
    
    //Clear todoInput Value
    todoInput.value = "";

}

function deleteCheck(e){
    const item = e.target;

    //Delete todo item
    if(item.classList[0] === "trash-btn") {
        const todo= item.parentElement;
    //Animation
        todo.classList.add("fall");
        todo.addEventListener('trasitionend', function(){
            todo.remove();
        });
    }

    //Complete todo item
    if (item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
                case "remaining":
                    if(!todo.classList.contains("completed")){
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
        }
    });
}


function saveLocalTodos(todo){
    //Check -- Is there already todos in there?
    let todos;
    if(localStorage.getItem("todos")=== null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    
}