export class Todo {
    title: string;
    isCompleted: boolean;

    constructor(title: string, isCompleted = false) {
        this.title = title;
        this.isCompleted = isCompleted;
    }

    toggleStatus(): void {
        this.isCompleted = !this.isCompleted;
    }
}