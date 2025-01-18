import { Todo } from "./todo.js";
export class TodoList {
    constructor() {
        this.todos = [];
    }
    add(value, isCompleted = false) {
        if (typeof value === "string") {
            this.todos.push(new Todo(value, isCompleted));
        }
        else if (value instanceof Todo) {
            this.todos.push(value);
        }
        else {
            throw new Error("Invalid argument. Expected a Todo instance or a title string.");
        }
    }
    addMany(values) {
        this.todos.push(...values);
    }
    remove(value) {
        if (typeof value === "number") {
            if (value >= 0 && value < this.todos.length) {
                this.todos.splice(value, 1);
            }
            else {
                throw new Error(`Invalid index: ${value}`);
            }
        }
        else if (value instanceof Todo) {
            const index = this.todos.indexOf(value);
            if (index !== -1) {
                this.todos.splice(index, 1);
            }
            else {
                throw new Error("Todo not found.");
            }
        }
        else {
            throw new Error("Invalid argument. Expected a number or a Todo instance.");
        }
    }
    toggleStatus(value) {
        if (typeof value === "number") {
            if (value >= 0 && value < this.todos.length) {
                this.todos[value].toggleStatus();
            }
            else {
                throw new Error(`Invalid index: ${value}`);
            }
        }
        else if (value instanceof Todo) {
            const index = this.todos.indexOf(value);
            if (index !== -1) {
                this.todos[index].toggleStatus();
            }
            else {
                throw new Error("Todo not found.");
            }
        }
        else {
            throw new Error("Invalid argument. Expected a number or a Todo instance.");
        }
    }
    getAll() {
        return [...this.todos];
    }
    forEach(callback) {
        this.todos.forEach(callback);
    }
    getCount() {
        return this.todos.length;
    }
    clear() {
        this.todos = [];
    }
}
