import { STORAGE_KEY_TASKS } from '../constants';
import { SubscribeAction, SubscribeType, TaskMeta, TaskPayload } from '../types';
import { Task } from './Task';

export class State {
    private static instance: State;
    _tasks: Record<string, Task> = {};
    private host: HTMLElement | null;
    private listeners: Array<SubscribeAction> = [];
    private storage: Array<TaskPayload> = [];
    private _search: string;

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

    set search(value: string) {
        this._search = value.trim();
        this.searchTasks();
    }

    get search() {
        return this._search;
    }

    subscribe(payload: SubscribeAction) {
        this.listeners.push(payload);
    }

    addTask(task: Task, shouldUpdate = true) {
        this.saveTask(task);
        this.storeTask(task.id);

        shouldUpdate && this.callListeners('add');
    }

    storeTask(id: string) {
        const task = this.tasks[id];

        if (task) {
            const taskMeta: TaskMeta = {
                name: task.name,
                start: task.startDate,
                end: task.endDate,
                priority: task.priority,
                status: task.status,
            };

            this.storage.push(taskMeta);
            localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(this.storage));
        }
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

        this.callListeners('remove');

        return !Object.prototype.hasOwnProperty.call(this._tasks, id);
    }

    private constructor() {
        this.host = document.getElementById('app');
    }

    private callListeners(actionType: SubscribeType) {
        const action = this.listeners.find((payload: SubscribeAction) => payload.type === actionType);
        action && action.handler();
    }

    private saveTask(task: Task) {
        if (task.errors.length) return;

        if (!(task.id in this._tasks)) {
            this._tasks[task.id] = task;
        }
    }

    private searchTasks() {
        Object.values(this.tasks).forEach((task: Task) => {
            if (!task.name.includes(this.search)) {
                task.hide();
            } else {
                task.show();
            }
        });

        this.callListeners('search');
    }
}
