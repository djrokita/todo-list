import { TModal, ModalPayload } from '../types';
import { Task } from './Task';
import { Component } from './Component';
import { withAutobind } from '../decorators';
import { RENDERER } from '../renderers';
import { getDaysLeft, getProgressDays, getProgressStyle } from '../utils';
import { ID_TASK_HOST } from '../constants';

const ID_TEMPLATE = 'task-item';
const ID_NAME = 'task-name';
const ID_REMOVE_BUTTON = 'task-remove';
const ID_EDIT_BUTTON = 'task-edit';
const ID_CHECK_BUTTON = 'task-check';
const ID_TAG_PRIORITY = 'task-priority';
const ID_DAYS = 'task-days';
const ID_PROGRESS = 'task-progress';

export class TaskItem extends Component<HTMLDivElement, HTMLDivElement> {
    editButton: HTMLElement;
    removeButton: HTMLElement;
    checkButton: HTMLElement;
    nameElement: HTMLElement;
    tagElement: HTMLElement;
    daysLeft: HTMLElement;
    progress: HTMLProgressElement;
    private _visible: boolean;

    constructor(private task: Task) {
        super(ID_TEMPLATE, ID_TASK_HOST, true);
        this.prepare();
    }

    get visible() {
        return this._visible;
    }

    set visible(value: boolean) {
        this._visible = value;
        value ? this.show() : this.destroy();
    }

    get referance() {
        return this.element;
    }

    update() {
        this.prepareName();
        this.prepareTag();
        this.prepareDaysLeft();
        this.prepareProgress();
        this.adjustElementToStatus();
    }

    private show() {
        this.attachElement(ID_TASK_HOST);
    }

    protected prepare() {
        this.prepareID();
        this.prepareName();
        this.prepareTag();
        this.prepareDaysLeft();
        this.prepareProgress();
        this.prepareButtons();
        this.attachEvents();
    }

    private prepareID() {
        this.element.dataset.id = this.task.id;
    }

    private prepareName() {
        this.nameElement = this.element?.querySelector(`#${ID_NAME}`);

        if (!this.nameElement) return;

        this.nameElement.textContent = this.task.name;
    }

    private prepareTag() {
        if (!this.tagElement) {
            this.tagElement = this.element.querySelector(`#${ID_TAG_PRIORITY}`);
        }

        const tag = RENDERER.getPriorityTag(this.task.priority);
        this.tagElement.replaceChildren(tag);
    }

    private prepareDaysLeft() {
        if (!this.daysLeft) {
            this.daysLeft = this.element.querySelector(`#${ID_DAYS}`);
        }

        const days = getDaysLeft(this.task.endDate);

        let daysMessage: string;

        if (days === 0) {
            daysMessage = 'last day';
        }

        if (days) {
            daysMessage = days.toString() + ' D';
        }

        this.daysLeft.textContent = daysMessage;
    }

    private prepareProgress() {
        if (!this.progress) {
            this.progress = this.element.querySelector(`#${ID_PROGRESS}`);
        }

        const progressIndicator = getProgressDays(this.task.endDate, this.task.startDate);
        this.progress.value = progressIndicator;
        this.progress.classList.remove('is-danger', 'is-warning', 'is-success');
        this.progress.classList.add(getProgressStyle(progressIndicator));
    }

    private prepareButtons() {
        this.removeButton = this.element.querySelector(`#${ID_REMOVE_BUTTON}`);
        this.editButton = this.element.querySelector(`#${ID_EDIT_BUTTON}`);
        this.checkButton = this.element.querySelector(`#${ID_CHECK_BUTTON}`);
    }

    private adjustElementToStatus() {
        if (this.task.status === 'completed') {
            this.element?.classList.add('has-background-grey-lighter');
            this.nameElement?.classList.add('is-line-through');
            this.editButton?.classList.add('is-hidden');
            this.daysLeft?.classList.add('is-hidden');
            this.tagElement.lastElementChild.classList.add('is-light');
        }

        if (this.task.status === 'active') {
            this.element?.classList.remove('has-background-grey-lighter');
            this.nameElement?.classList.remove('is-line-through');
            this.editButton?.classList.remove('is-hidden');
            this.daysLeft?.classList.remove('is-hidden');
            this.tagElement.lastElementChild.classList.remove('is-light');
        }
    }

    private attachEvents() {
        this.removeButton?.addEventListener('click', this.removeHandler);
        this.editButton?.addEventListener('click', this.editHandler);
        this.checkButton?.addEventListener('click', this.checkHandler);
        this.element.addEventListener('dragstart', this.dragstartHandler);
    }

    @withAutobind
    private removeHandler() {
        this.task.remove();
    }

    @withAutobind
    private checkHandler() {
        const status = this.task.status === 'active' ? 'completed' : 'active';
        this.task.status = status;
        this.update();
    }

    @withAutobind
    private editHandler() {
        const modalRef = <HTMLTemplateElement>document.querySelector('.modal');
        const modal: TModal = {
            type: 'edit',
            name: this.task.name,
            start: this.task.startDate,
            end: this.task.endDate,
            priority: this.task.priority,
        };
        const detail: ModalPayload = { modal, handler: this.task.edit };
        const modalEvent = new CustomEvent('modal', { detail });
        modalRef?.dispatchEvent(modalEvent);
    }

    @withAutobind
    private dragstartHandler(event: DragEvent) {
        event.dataTransfer.setData('text/plain', this.task.id);
        event.dataTransfer.effectAllowed = 'move';
    }

    protected render() {
        console.log('render...');
    }
}
