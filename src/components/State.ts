import { Task } from './Task';

type CallBackFn = () => unknown;

export class State {
    private static instance: State;
    _tasks: Record<string, Task> = {};
    private host: HTMLElement | null;
    private listeners: Array<CallBackFn> = [];

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

    subscribe(callback: () => unknown) {
        this.listeners.push(callback);
    }

    addTask(task: Task) {
        if (task.errors.length) return;

        if (!(task.id in this._tasks)) {
            this._tasks[task.id] = task;
        }

        this.callListeners();
    }

    getTask(id: string) {
        if (this._tasks[id] instanceof Task) {
            return this._tasks[id];
        }
    }

    removeTask(id: string) {
        if (Object.prototype.hasOwnProperty.call(this._tasks, id)) {
            delete this._tasks[id];
        }

        this.callListeners();

        return !Object.prototype.hasOwnProperty.call(this._tasks, id);
    }

    private constructor() {
        this.host = document.getElementById('app');
    }

    private callListeners() {
        this.listeners.forEach((cb: CallBackFn) => cb());
    }
}
