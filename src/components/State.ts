import { TaskEvent, ITask } from '../types';

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
            this.host?.addEventListener('add', this.addHandler.bind(this), true);
            this.host?.addEventListener('remove', this.removeHandler.bind(this), true);
            this.host?.addEventListener('check', this.checkHandler.bind(this), true);
        }
    }

    private addHandler(event: TaskEvent) {
        event.stopPropagation();
        this._tasks.push(event.detail);
        const list = this.host?.querySelector('#list-box');
        const updateEvent = new CustomEvent('update');
        list?.dispatchEvent(updateEvent);
    }

    private removeHandler(event: TaskEvent) {
        event.stopPropagation();
        const taskIndex = this._tasks.findIndex((task: ITask) => task.id === event.detail.id);
        this._tasks.splice(taskIndex, 1);
        const list = this.host?.querySelector('#list-box');
        const updateEvent = new CustomEvent('update');
        list?.dispatchEvent(updateEvent);
    }

    private checkHandler(event: TaskEvent) {
        event.stopPropagation();
        const taskIndex = this._tasks.findIndex((task: ITask) => task.id === event.detail.id);
        this._tasks.splice(taskIndex, 1, event.detail);
        const list = this.host?.querySelector('#list-box');
        const updateEvent = new CustomEvent('update');
        list?.dispatchEvent(updateEvent);
    }
}
