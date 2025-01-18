import { Todo } from "@models/todo";

export class TodoList {
    private todos: Todo[] = [];

    add(todo: Todo): void;
    add(title: string, isCompleted?: boolean): void;
    add(value: Todo | string, isCompleted: boolean = false): void {
        if (typeof value === "string") {
            this.todos.push(new Todo(value, isCompleted));
        } else if (value instanceof Todo) {
            this.todos.push(value);
        } else {
            throw new Error("Invalid argument. Expected a Todo instance or a title string.");
        }
    }

    addMany(values: Todo[]): void {
        this.todos.push(...values);
    }

    remove(todo: Todo): void;
    remove(index: number): void;
    remove(value: number | Todo): void {
        if (typeof value === "number") {
            if (value >= 0 && value < this.todos.length) {
                this.todos.splice(value, 1);
            } else {
                throw new Error(`Invalid index: ${value}`);
            }
        } else if (value instanceof Todo) {
            const index = this.todos.indexOf(value);
            if (index !== -1) {
                this.todos.splice(index, 1);
            } else {
                throw new Error("Todo not found.");
            }
        } else {
            throw new Error("Invalid argument. Expected a number or a Todo instance.");
        }
    }

    toggleStatus(todo: Todo): void;
    toggleStatus(index: number): void;
    toggleStatus(value: number | Todo): void {
        if (typeof value === "number") {
            if (value >= 0 && value < this.todos.length) {
                this.todos[value].toggleStatus();
            } else {
                throw new Error(`Invalid index: ${value}`);
            }
        } else if (value instanceof Todo) {
            const index = this.todos.indexOf(value);
            if (index !== -1) {
                this.todos[index].toggleStatus();
            } else {
                throw new Error("Todo not found.");
            }
        } else {
            throw new Error("Invalid argument. Expected a number or a Todo instance.");
        }
    }

    getAll(): Todo[] {
        return [...this.todos];
    }

    forEach(callback: (todo: Todo, index: number, array: Todo[]) => void): void {
        this.todos.forEach(callback);
    }

    getCount(): number {
        return this.todos.length;
    }

    clear(): void {
        this.todos = [];
    }
}