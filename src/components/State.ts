import { STORAGE_KEY_TASKS } from '../constants';
import { SubscribeAction, SubscribeType, TaskFilterPriority, TaskPayload } from '../types';
import { Task } from './Task';

export class State {
    private static instance: State;
    _tasks: Record<string, Task> = {};
    private host: HTMLElement | null;
    private listeners: Array<SubscribeAction> = [];
    private storage: Array<TaskPayload> = [];
    private _search = '';
    private _filter: TaskFilterPriority = 'all';

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

    set filter(value: TaskFilterPriority) {
        this._filter = value;
        this.filterTasks();
    }

    get filter() {
        return this._filter;
    }

    taskCount() {
        return Object.keys(this.tasks).length;
    }

    subscribe(payload: SubscribeAction) {
        this.listeners.push(payload);
    }

    addTask(task: Task) {
        this.saveTask(task);

        this.callListeners('add');
    }

    storeTasks() {
        this.storage = Object.values(this.tasks).map((task: Task) => ({
            name: task.name,
            start: task.startDate,
            end: task.endDate,
            priority: task.priority,
            status: task.status,
        }));

        localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(this.storage));
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
        this.listeners.forEach((payload: SubscribeAction) => {
            if (payload.type === actionType) {
                payload.handler();
            }
        });
    }

    private saveTask(task: Task) {
        if (task.errors.length) return;

        if (!(task.id in this._tasks)) {
            this._tasks[task.id] = task;
        }
    }

    private filterTasks() {
        if (this.filter === 'all') {
            this.showAllTasks();

            return;
        }

        let tasks = Object.values(this.tasks);

        if (this.search.length) {
            tasks = tasks.filter((task: Task) => task.name.includes(this.search));
        }

        tasks.forEach((task: Task) => {
            if (task.priority !== this.filter) {
                task.hide();
            } else {
                task.show();
            }
        });

        this.callListeners('search');
    }

    private showAllTasks() {
        Object.values(this.tasks).forEach((task: Task) => task.show());
        this.callListeners('search');
    }

    private searchTasks() {
        let tasks = Object.values(this.tasks);

        if (this.filter !== 'all') {
            tasks = tasks.filter((task: Task) => task.priority === this.filter);
        }

        tasks.forEach((task: Task) => {
            if (!task.name.includes(this.search)) {
                task.hide();
            } else {
                task.show();
            }
        });

        this.callListeners('search');
    }
}
