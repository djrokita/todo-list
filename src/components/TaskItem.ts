import { ACTIONS, TModal, ModalPayload } from '../types';
import { Task } from './Task';
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
    nameElement: HTMLElement | null | undefined;

    constructor(private task: Task) {
        super(ID_TEMPLATE, ID_HOST);
        this.prepare();
    }

    update() {
        this.prepareName();
        this.adjustElementToStatus();
    }

    protected prepare() {
        this.prepareName();
        this.prepareButtons();
        this.attachEvents();
    }

    private prepareName() {
        this.nameElement = this.element?.querySelector('#taskItem-name');

        if (!this.nameElement) return;

        this.nameElement.textContent = this.task.name;
    }

    private prepareButtons() {
        if (this.element) {
            this.removeButton = this.element.querySelector(`#${ID_REMOVE_BUTTON}`);
            this.editButton = this.element.querySelector(`#${ID_EDIT_BUTTON}`);
            this.checkButton = this.element.querySelector(`#${ID_CHECK_BUTTON}`);
        }
    }

    private adjustElementToStatus() {
        if (this.task.status === 'completed') {
            this.element?.classList.add('has-background-grey-lighter');
            this.nameElement?.classList.add('is-line-through');
            this.editButton?.classList.add('is-hidden');
        }

        if (this.task.status === 'active') {
            this.element?.classList.remove('has-background-grey-lighter');
            this.nameElement?.classList.remove('is-line-through');
            this.editButton?.classList.remove('is-hidden');
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
        this.task.status = status;
        this.update();
    }

    private editHandler() {
        const modalRef = <HTMLTemplateElement>document.querySelector('.modal');
        const modal: TModal = { header: 'Edit your task', value: this.task.name };
        const detail: ModalPayload = { modal, handler: this.task.changeName.bind(this.task) };
        const modalEvent = new CustomEvent('modal', { detail });
        modalRef?.dispatchEvent(modalEvent);
    }

    protected render() {}

    // public destroy() {
    //     console.log('destroying');
    //     this.element?.remove();
    // }
}
