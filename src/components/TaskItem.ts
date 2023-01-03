import { ITask, ACTIONS, TModal } from '../types';
import { Component } from './Component';

const ID_TEMPLATE = 'task-item';
const ID_HOST = 'list-box';

const ID_REMOVE_BUTTON = 'task-remove';
const ID_EDIT_BUTTON = 'task-edit';
const ID_CHECK_BUTTON = 'task-check';

export class TaskItem extends Component<HTMLDivElement, HTMLDivElement> {
    editButton: HTMLElement | null = null;
    removeButton: HTMLElement | null = null;
    checkButton: HTMLElement | null = null;
    // nameArea: HTMLElement | null = null;
    // box: HTMLElement | null = null;

    constructor(private task: ITask) {
        super(ID_TEMPLATE, ID_HOST);
        this.prepare();
    }

    protected prepare() {
        this.renderName();
        this.prepareButtons();
        this.prepareContainer();
        this.attachEvents();
    }

    private renderName() {
        const nameElement = this.element?.querySelector('#taskItem-name');

        if (nameElement) {
            nameElement.textContent = this.task.name;

            if (this.task.status === 'completed') {
                nameElement.classList.add('is-line-through');
            }
        }
    }

    private prepareContainer() {
        if (this.task.status === 'completed') {
            this.element?.classList.add('has-background-grey-lighter');
        }
    }

    private prepareButtons() {
        if (this.element) {
            this.removeButton = this.element.querySelector(`#${ID_REMOVE_BUTTON}`);
            this.editButton = this.element.querySelector(`#${ID_EDIT_BUTTON}`);
            this.checkButton = this.element.querySelector(`#${ID_CHECK_BUTTON}`);

            if (this.task.status === 'completed') {
                this.editButton?.classList.add('is-hidden');
            }
        }
    }

    private attachEvents() {
        this.removeButton?.addEventListener('click', this.removeHandler.bind(this));
        this.editButton?.addEventListener('click', this.editHandler.bind(this));
        this.checkButton?.addEventListener('click', this.checkHandler.bind(this));
    }

    private removeHandler() {
        const removeEvent = new CustomEvent(ACTIONS.REMOVE, { detail: { id: this.task.id } });
        this.element?.dispatchEvent(removeEvent);
    }

    private checkHandler() {
        const status = this.task.status === 'active' ? 'completed' : 'active';
        const task: ITask = { ...this.task, status };
        const checkEvent = new CustomEvent(ACTIONS.CHECK, { detail: task });
        this.element?.dispatchEvent(checkEvent);
    }

    private editHandler() {
        const modalRef = <HTMLTemplateElement>document.querySelector('.modal');
        const modal: TModal = { header: 'Edit your task', isOpen: true };
        const detail = { modal, task: this.task };
        const modalEvent = new CustomEvent('modal', { detail });
        modalRef?.dispatchEvent(modalEvent);
    }

    protected render() {}

    // public destroy() {
    //     console.log('destroying');
    //     this.element?.remove();
    // }
}
