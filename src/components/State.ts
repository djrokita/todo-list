import { Task } from './Task';

export class State {
    private static instance: State;
    _tasks: Record<string, Task> = {};
    private host: HTMLElement | null;

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new State();

        return this.instance;
    }

    get tasks() {
        return this._tasks;
    }

    addTask(task: Task) {
        if (!Object.prototype.hasOwnProperty.call(this._tasks, task.id)) {
            this._tasks[task.id] = task;
        }

        if (this._tasks[task.id] instanceof Task) {
            return true;
        }
    }

    removeTask(id: string) {
        if (Object.prototype.hasOwnProperty.call(this._tasks, id)) {
            delete this._tasks[id];
        }

        return !Object.prototype.hasOwnProperty.call(this._tasks, id);
    }

    private constructor() {
        this.host = document.getElementById('app');
    }
}
