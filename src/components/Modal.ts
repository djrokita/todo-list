import { Component } from './Component';
import { ModalEvent, TModal, ModalHandler, TaskPayload, TaskPriority } from '../types';
import { withAutobind, withErrorMessage } from '../decorators';
import { RENDERER } from '../renderers';
import { PRIORITIES } from '../constants';

const ID_TEMPLATE = 'modal';
const ID_HOST = 'app';
const ID_SAVE_BUTTON = 'modal-save';
const ID_CANCEL_BUTTON = 'modal-cancel';
const ID_ClOSE_BUTTON = 'modal-close';
const ID_INPUT_NAME = 'modal-input__name';
const ID_INPUT_START = 'modal-input__start';
const ID_INPUT_END = 'modal-input__end';
const ID_INPUT_PRIORITY = 'modal-input__priority';
const ID_FORM = 'modal-form';
const ID_HEADER = 'modal-header';
const ACTIVE_MODAL = 'is-active';

const DEAFULT_HANDLER = (payload: TaskPayload): any[] => [];

@withErrorMessage
export class Modal extends Component<HTMLTemplateElement, HTMLDivElement> {
    closeButton: HTMLElement;
    cancelButton: HTMLElement;
    saveButton: HTMLElement;
    taskName: HTMLInputElement;
    startDate: HTMLInputElement;
    endDate: HTMLInputElement;
    priority: HTMLSelectElement;
    header: HTMLParagraphElement;
    modal: TModal | null;
    handler: ModalHandler;
    form: HTMLFormElement;
    // error?: HTMLParagraphElement;
    validate: any;

    constructor() {
        super(ID_TEMPLATE, ID_HOST);

        this.prepare();
        this.attachEvents();
        this.handler = DEAFULT_HANDLER;
    }

    private attachEvents() {
        this.element?.addEventListener('modal', this.modalHandler, true);

        if (this.closeButton && this.cancelButton && this.element) {
            [this.closeButton, this.cancelButton].forEach((button: HTMLElement) => {
                button.addEventListener('click', this.toggleHandler);
            });
        }
        this.form?.addEventListener('submit', this.saveHandler);
        this.saveButton?.addEventListener('click', this.saveHandler);
    }

    private prepareButtons() {
        if (!this.element) return;

        this.closeButton = this.element.querySelector(`#${ID_ClOSE_BUTTON}`)!;
        this.cancelButton = this.element.querySelector(`#${ID_CANCEL_BUTTON}`)!;
        this.saveButton = this.element.querySelector(`#${ID_SAVE_BUTTON}`)!;
    }

    private prepareInputs() {
        if (!this.element) return;

        this.form = this.element.querySelector(`#${ID_FORM}`)!;
        this.taskName = this.element.querySelector(`#${ID_INPUT_NAME}`)!;
        this.startDate = this.element.querySelector(`#${ID_INPUT_START}`)!;
        this.endDate = this.element.querySelector(`#${ID_INPUT_END}`)!;
        this.priority = this.element.querySelector(`#${ID_INPUT_PRIORITY}`)!;

        this.preparePrioritySelect();
    }

    private preparePrioritySelect() {
        const optionElemens = RENDERER.getSelectOption(PRIORITIES);
        optionElemens.forEach((option: HTMLOptionElement) => this.priority.append(option));
    }

    private prepareHeader() {
        if (!this.element) return;

        this.header = this.element.querySelector(`#${ID_HEADER}`)!;
    }

    @withAutobind
    private modalHandler(event: ModalEvent) {
        if (event.detail) {
            this.modal = event.detail.modal;
            this.handler = event.detail.handler;
            this.setContent();
        } else {
            this.clear();
        }

        this.toggleHandler();
    }

    private setContent() {
        if (!this.modal) return;

        this.setHeader();

        this.taskName.value = this.modal.name;
        this.startDate.valueAsDate = new Date(this.modal.start);
        this.endDate.valueAsDate = new Date(this.modal.end);
        this.priority.value = this.modal.priority;
    }

    private setHeader() {
        if (!this.header) return;
        let header: string;

        switch (this.modal?.type) {
            case 'edit':
                header = 'Edit your task';
                break;
            case 'create':
                header = 'Setup your task';
                break;
            default:
                header = 'Default modal';
        }

        this.header.textContent = header;
    }

    private clear() {
        //     this.modal = null;
        //     if (this.error) {
        //         this.error.textContent = '';
        //     }
        //     this.handler = DEAFULT_HANDLER;
    }

    @withAutobind
    private saveHandler(event: Event) {
        event.preventDefault();

        return this.validate(this.actionHandler);
    }

    @withAutobind
    private actionHandler() {
        const payload: TaskPayload = {
            name: this.taskName.value!,
            start: this.startDate.value!,
            end: this.endDate.value!,
            priority: <TaskPriority>this.priority.value,
        };

        const errors = this.handler(payload);
        if (!errors) {
            this.toggleHandler();
        }

        return errors;
    }

    @withAutobind
    private toggleHandler() {
        this.element?.classList.toggle(ACTIVE_MODAL);

        if (this.element?.classList.contains(ACTIVE_MODAL)) {
            this.taskName?.focus();
        } else {
            this.clear();
        }
    }

    protected prepare() {
        this.prepareButtons();
        this.prepareInputs();
        this.prepareHeader();
    }

    protected render() {
        console.log('render...');
    }
}
