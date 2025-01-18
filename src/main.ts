import { Todo } from "@models/todo";
import { TodoList } from "@models/todoList";

const todoList = new TodoList();

const titleInput = document.querySelector<HTMLInputElement>("#title-input");
const addButton = document.querySelector<HTMLButtonElement>("#add-button");
const todoUList = document.querySelector<HTMLUListElement>("#todo-list");

function loadTodos(): void {
    const savedTodos = localStorage.getItem("todoList");

    if (savedTodos) {
        const parsedTodos = JSON.parse(savedTodos) as Array<{ title: string, isCompleted: boolean}>;

        const todos = parsedTodos.map(todo => new Todo(todo.title, todo.isCompleted));

        todoList.addMany(todos);
    }
}

function saveTodos(): void {
    const todos = todoList.getAll();
    localStorage.setItem("todoList", JSON.stringify(todos));
}

function renderTodos(): void {
    if (!todoUList) {
        return;
    }

    todoUList.innerHTML = "";

    todoList.forEach((todo, index) => {
        const listItem = document.createElement("li");
        if (todo.isCompleted) {
            listItem.className = "completed";
        } else {
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

addButton?.addEventListener("click", (event) => {
    event.preventDefault();

    if (titleInput?.value) {
        todoList.add(titleInput.value);
        titleInput.value = "";
        saveTodos();
        renderTodos();
    }
});

loadTodos();
renderTodos();