import { TaskEvent, ITask, ACTIONS, EditNameEvent, EditNamePayload } from '../types';
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

    private constructor() {
        this.host = document.getElementById('app');
        this.attachEvents();
    }

    private attachEvents() {
        this.host?.addEventListener(ACTIONS.ADD, this.eventHandler.bind(this), true);
        this.host?.addEventListener(ACTIONS.REMOVE, this.eventHandler.bind(this), true);
        this.host?.addEventListener(ACTIONS.CHECK, this.eventHandler.bind(this), true);
        this.host?.addEventListener(ACTIONS.EDIT, this.eventHandler.bind(this), true);
    }

    private eventHandler(event: TaskEvent) {
        event.stopPropagation();
        this.dispatchAction(event);
        const list = this.host?.querySelector('#list-box');
        const updateEvent = new CustomEvent('update');
        list?.dispatchEvent(updateEvent);
    }

    private addAction(name: string) {
        this.createTask(name);
    }

    createTask(name: string) {
        const task = new Task(name, this.destroyTask.bind(this));

        if (!Object.prototype.hasOwnProperty.call(this._tasks, task.id)) {
            this._tasks[task.id] = task;
        }

        console.log('state', this._tasks);
    }

    private destroyTask(id: string) {
        if (Object.prototype.hasOwnProperty.call(this._tasks, id)) {
            delete this._tasks[id];
        }

        return !Object.prototype.hasOwnProperty.call(this._tasks, id);
    }

    private removeAction(payload: { id: string }) {
        if (Object.prototype.hasOwnProperty.call(this._tasks, payload.id)) {
            this._tasks[payload.id].remove();
        }
    }

    private editAction(payload: EditNamePayload) {
        if (Object.prototype.hasOwnProperty.call(this._tasks, payload.id)) {
            this._tasks[payload.id].changeName(payload.name);
        }
    }

    private closeModal(event: TaskEvent) {
        const closeEvent = new Event('modal');
        event.target?.dispatchEvent(closeEvent);
    }

    private dispatchAction(event: CustomEvent) {
        const { type, detail } = event;

        switch (type) {
            case ACTIONS.ADD:
                return this.addAction(detail);
            case ACTIONS.REMOVE:
                return this.removeAction(detail);
            // case ACTIONS.CHECK:
            //     return this.editAction(detail);
            case ACTIONS.EDIT:
                this.editAction(detail);
                return this.closeModal(event);

            default:
                return null;
        }
    }
}
