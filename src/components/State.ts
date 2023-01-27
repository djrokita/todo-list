import { STORAGE_KEY_TASKS } from '../constants';
import { SubscribeAction, SubscribeType, TaskFilterPriority, TaskPayload } from '../types';
import { Task } from './Task';

export class State {
    private static instance: State;
    private _tasks: Array<Task> = [];
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
        this.storage = this.tasks.map((task: Task) => ({
            name: task.name,
            start: task.startDate,
            end: task.endDate,
            priority: task.priority,
            status: task.status,
        }));

        localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(this.storage));
    }

    getTask(id: string) {
        return this.tasks.find((task: Task): boolean => task.id === id);
    }

    removeTask(id: string) {
        this._tasks = this.tasks.filter((task: Task): boolean => task.id !== id);
        this.callListeners('remove');

        return true;
    }

    reorderTasks(movedId: string, targetId: string) {
        const movedIndex = this.tasks.findIndex((task: Task) => task.id === movedId);
        const targetIndex = this.tasks.findIndex((task: Task) => task.id === targetId);

        if (targetIndex < 0 || movedIndex < 0) return;

        const movedTask = this.tasks.find((task: Task) => task.id === movedId);

        if (movedTask) {
            this.tasks.splice(movedIndex, 1);
            this.tasks.splice(targetIndex, 0, movedTask);
        }
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

        if (!this.getTask(task.id)) {
            this._tasks.unshift(task);
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
