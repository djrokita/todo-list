import { TaskEvent, ITask, ACTIONS } from '../types';

export class State {
    private static instance: State;
    _tasks: ITask[] = [
        {
            id: '1234test',
            ownerID: 'abc',
            name: 'Test task',
            status: 'active',
        },
    ];
    private host: HTMLElement | null;

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new State();

        return this.instance;
    }

    get task() {
        return this._tasks;
    }

    private constructor() {
        this.host = document.getElementById('app');
        this.attachEvents();
    }

    private attachEvents() {
        if (this.host) {
            this.host?.addEventListener(ACTIONS.ADD, this.eventHandler.bind(this), true);
            this.host?.addEventListener(ACTIONS.REMOVE, this.eventHandler.bind(this), true);
            this.host?.addEventListener(ACTIONS.CHECK, this.eventHandler.bind(this), true);
        }
    }

    private eventHandler(event: TaskEvent) {
        event.stopPropagation();
        this.dispatchAction(event);
        const list = this.host?.querySelector('#list-box');
        const updateEvent = new CustomEvent('update');
        list?.dispatchEvent(updateEvent);
    }

    private addAction(task: ITask) {
        this._tasks.push(task);
    }

    private removeAction(task: ITask) {
        const taskIndex = this._tasks.findIndex((curTask: ITask) => curTask.id === task.id);
        this._tasks.splice(taskIndex, 1);
    }

    private checkAction(task: ITask) {
        const taskIndex = this._tasks.findIndex((curTask: ITask) => curTask.id === task.id);
        this._tasks.splice(taskIndex, 1, task);
    }

    private dispatchAction(event: TaskEvent) {
        const { type, detail } = event;

        switch (type) {
            case ACTIONS.ADD:
                return this.addAction(detail);
            case ACTIONS.REMOVE:
                return this.removeAction(detail);
            case ACTIONS.CHECK:
                return this.checkAction(detail);
            default:
                return null;
        }
    }
}
