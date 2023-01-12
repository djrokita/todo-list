import { TaskForm } from './TaskForm';
import { TaskList } from './TaskList';

export class TaskPanel {
    search: TaskForm;
    list: TaskList;

    constructor() {
        this.prepareSearch();
        this.prepareList();
    }

    private prepareSearch() {
        this.search = new TaskForm();
    }

    private prepareList() {
        this.list = new TaskList();
    }

    unMount(): void {
        this.search.unMount();
        this.list.unMount();
    }

    mount(): void {
        this.search.mount();
        this.list.mount();
    }
}
