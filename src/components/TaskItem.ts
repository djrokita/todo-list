// import { BaseElement } from './BaseElement';
// import { CREATOR } from '../renderers/index';
import { Status, Task } from '../types';
import { Component } from './Component';

const ID_TEMPLATE = 'task-item';
const ID_HOST = 'list-box';

export class TaskItem extends Component<HTMLDivElement, HTMLDivElement> {
    name: string;
    status: Status;

    // editButton: HTMLElement | null = null;
    // removeButton: HTMLElement | null = null;
    // completeButton: HTMLElement | null = null;
    // nameArea: HTMLElement | null = null;
    // box: HTMLElement | null = null;

    constructor(task: Task) {
        // debugger;
        super(ID_TEMPLATE, ID_HOST);

        this.name = task.name;
        this.status = task.status;
    }

    // protected prepare() {
    //     console.log('preparing');
    // }

    protected render() {
        console.log('rendering list');
    }

    protected destroy() {
        console.log('destroying');
    }
}
