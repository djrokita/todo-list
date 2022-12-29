import { Status, ITask, TaskEvent } from '../types';
import { Component } from './Component';

const ID_TEMPLATE = 'task-item';
const ID_HOST = 'list-box';

const ID_REMOVE_BUTTON = 'task-remove';
const ID_EDIT_BUTTON = 'task-edit';
const ID_CHECK_BUTTON = 'task-check';

export class TaskItem extends Component<HTMLDivElement, HTMLDivElement> {
    editButton: HTMLElement | null = null;
    removeButton: HTMLElement | null = null;
    completeButton: HTMLElement | null = null;
    // nameArea: HTMLElement | null = null;
    // box: HTMLElement | null = null;

    constructor(private task: ITask) {
        super(ID_TEMPLATE, ID_HOST);
        this.prepare();
    }

    protected prepare() {
        this.renderName();
        this.prepareButtons();
        this.attachEvents();
    }

    private renderName() {
        const nameElement = this.element?.querySelector('#taskItem-name');

        if (nameElement) {
            nameElement.textContent = this.task.name;
        }
    }

    private prepareButtons() {
        if (this.element) {
            this.removeButton = this.element.querySelector(`#${ID_REMOVE_BUTTON}`);
            this.editButton = this.element.querySelector(`#${ID_EDIT_BUTTON}`);
            this.completeButton = this.element.querySelector(`#${ID_CHECK_BUTTON}`);
        }
    }

    private attachEvents() {
        this.removeButton?.addEventListener('click', this.removeHandler.bind(this));
        //     this.editButton?.addEventListener('click', this.editHandler.bind(this));
        //     this.completeButton?.addEventListener('click', this.completeHandler.bind(this));
    }

    private removeHandler() {
        const removeEvent = new CustomEvent('remove', { detail: this.task });
        this.element?.dispatchEvent(removeEvent);
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
