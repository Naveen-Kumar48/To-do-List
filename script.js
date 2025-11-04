// selecDOM ELEMENT
const input = document.getElementById('todo-input')
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');
const themeToggle = document.getElementById('theme-toggle');


const saved = localStorage.getItem('todos');
const todos = saved? JSON.parse(saved) : [];

// Theme persistence
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (themeToggle) themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}

function saveToDo() {
    localStorage.setItem('todos', JSON.stringify(todos))
}

function saveTheme(theme) {
    localStorage.setItem('theme', theme);
}

function createToDoNode(todo, index) {
    const li = document.createElement('li')
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;
        li.classList.toggle('completed', todo.completed);
        saveToDo();
    })
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin = "0 8px"
    if (todo.completed) {
        li.classList.add('completed');
    }
    // toggle complete on text click
    textSpan.addEventListener('click', () => {
        todo.completed = !todo.completed;
        checkbox.checked = todo.completed;
        li.classList.toggle('completed', todo.completed);
        saveToDo();
    })
    // edit on double click
    textSpan.addEventListener("dblclick", () => {
        const newText = prompt("Edit Todo", todo.text)
        if (newText !== null) {
            const t = newText.trim();
            if (t) {
                todo.text = t;
                textSpan.textContent = todo.text
                saveToDo();
            }
        }
    })

    // Delete todo with small removal animation
    const delbtn = document.createElement('button')
    delbtn.textContent = "Delete";
    delbtn.addEventListener("click", () => {
        li.classList.add('removing');
        setTimeout(() => {
            todos.splice(index, 1);
            render();
            saveToDo();
        }, 220);
    })

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delbtn);
    return li;
}

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

    todos.push({ text, completed: false });
    input.value = '';
    render();
    saveToDo();
}

addBtn.addEventListener("click", addTODo)

// Add on Enter key
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTODo();
    }
})

// Theme toggle
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const next = isDark ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
        saveTheme(next);
    })
}

render();