import { Status, ITask } from '../types';
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

    constructor(task: ITask) {
        super(ID_TEMPLATE, ID_HOST);

        this.name = task.name;
        this.status = task.status;
        this.prepare();
    }

    protected prepare() {
        this.renderName();
    }

    private renderName() {
        const nameElement = this.element?.querySelector('#taskItem-name');

        if (nameElement) {
            nameElement.textContent = this.name;
        }
    }

    protected render() {
        // debugger;
        // const nameElement = this.element?.querySelector('#taskItem-name');
        // if (nameElement) {
        //     nameElement.textContent = this.name;
        // }
    }

    public destroy() {
        console.log('destroying');
        this.element?.remove();
    }
}
