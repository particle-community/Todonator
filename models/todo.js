export class Todo {
    constructor(title, isCompleted = false) {
        this.title = title;
        this.isCompleted = isCompleted;
    }
    toggleStatus() {
        this.isCompleted = !this.isCompleted;
    }
}
