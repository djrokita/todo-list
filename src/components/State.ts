import { AddEvent, ITask } from '../types';

export class State {
    private static instance: State;
    _tasks: ITask[] = [
        {
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
        }
    }

    private addHandler(event: AddEvent) {
        event.stopPropagation();
        this._tasks.push(event.detail);
        const list = this.host?.querySelector('#list-box');
        const updateEvent = new CustomEvent('update');
        list?.dispatchEvent(updateEvent);
    }
}
