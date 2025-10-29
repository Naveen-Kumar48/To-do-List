// selecDOM ELEMENT
const input = document.getElementById('todo-input')
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');


const saved = localStorage.getItem('todos');
const todos = saved? JSON.parse(saved) : [];

function saveToDo() {
    localStorage.setItem('todos', JSON.stringify(todos))
}







function createToDoNode(todo, index) {
    const li = document.createElement('li')
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.complete;
    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;



        // visiual feedback :strike through when completed
        textSpan.style.textDecoration=todo.complete?'line-through':"";
        saveToDo();
    })
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin = "0 8px"
    if (todo.completed) {
        textSpan.style.textDecoration = 'line-through';
    }
    // addDouble click Event listeiner
    document.addEventListener("dblclick", () => {
        const newText = prompt("Edit Todo", todo.text)
        if (newText == !null) {
            todo.text = newText.trim();
            textSpan.textContent = todo.text
            saveToDo();
        }
    })



    // Delete todo button

    const delbtn = document.createElement('button')
    delbtn.textContent = "Delete";
    delbtn.addEventListener("click",
        () => {
            todos.splice(index, 1);
            render();
            saveToDo();
        }
    )

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delbtn);
    return li;
}








// render the whole todo list from the todo array
function render() {
    list.innerHTML = ''
    todos.forEach((todo, index) => {
        const node = createToDoNode(todo, index)
       
        list.appendChild(node)
    })

}





function addTODo() {
    const text = input.value.trim()
    if (!text) {
        return;
    }
    // push a new todo
    todos.push({ text, completed: false });
    input.value = '';
    render();
    saveToDo();
}





addBtn.addEventListener("click",
    addTODo
)
render();