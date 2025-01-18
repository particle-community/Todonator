import { Todo } from "./models/todo.js";
import { TodoList } from "./models/todoList.js";
const todoList = new TodoList();
const titleInput = document.querySelector("#title-input");
const addButton = document.querySelector("#add-button");
const todoUList = document.querySelector("#todo-list");
function loadTodos() {
    const savedTodos = localStorage.getItem("todoList");
    if (savedTodos) {
        const parsedTodos = JSON.parse(savedTodos);
        const todos = parsedTodos.map(todo => new Todo(todo.title, todo.isCompleted));
        todoList.addMany(todos);
    }
}
function saveTodos() {
    const todos = todoList.getAll();
    localStorage.setItem("todoList", JSON.stringify(todos));
}
function renderTodos() {
    if (!todoUList) {
        return;
    }
    todoUList.innerHTML = "";
    todoList.forEach((todo, index) => {
        const listItem = document.createElement("li");
        if (todo.isCompleted) {
            listItem.className = "completed";
        }
        else {
            listItem.removeAttribute("class");
        }
        const checkboxLabel = document.createElement("label");
        checkboxLabel.className = "todo-checkbox";
        const checkboxInput = document.createElement("input");
        checkboxInput.type = "checkbox";
        checkboxInput.checked = todo.isCompleted;
        checkboxInput.addEventListener("change", () => {
            todoList.toggleStatus(index);
            saveTodos();
            renderTodos();
        });
        const checkmarkSpan = document.createElement("span");
        checkmarkSpan.className = "checkmark";
        checkmarkSpan.innerHTML = `
            <svg class="icon">
                <use xlink:href="icons/icons.svg#check"></use>
            </svg>`;
        checkboxLabel.append(checkboxInput, checkmarkSpan);
        const textParagraph = document.createElement("p");
        textParagraph.className = "todo-title";
        textParagraph.textContent = todo.title;
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.innerHTML = `
            <svg class="icon">
                <use xlink:href="icons/icons.svg#close"></use>
            </svg>`;
        deleteButton.addEventListener("click", () => {
            todoList.remove(index);
            saveTodos();
            renderTodos();
        });
        listItem.append(checkboxLabel, textParagraph, deleteButton);
        todoUList.appendChild(listItem);
    });
}
addButton === null || addButton === void 0 ? void 0 : addButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (titleInput === null || titleInput === void 0 ? void 0 : titleInput.value) {
        todoList.add(titleInput.value);
        titleInput.value = "";
        saveTodos();
        renderTodos();
    }
});
loadTodos();
renderTodos();
