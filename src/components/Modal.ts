import { Component } from './Component';
import { ITask, ModalEvent, TModal } from '../types';

const ID_TEMPLATE = 'modal';
const ID_HOST = 'app';
const ID_SAVE_BUTTON = 'modal-save';
const ID_CANCEL_BUTTON = 'modal-cancel';
const ID_ClOSE_BUTTON = 'modal-close';
const ID_INPUT_NAME = 'modal-input';
const ID_FORM = 'modal-form';
const ID_HEADER = 'modal-header';
const ACTIVE_MODAL = 'is-active';

export class Modal extends Component<HTMLTemplateElement, HTMLDivElement> {
    closeButton: HTMLElement | null = null;
    cancelButton: HTMLElement | null = null;
    saveButton: HTMLElement | null = null;
    inputName: HTMLInputElement | null = null;
    header: HTMLParagraphElement | null = null;
    modal: TModal | null = null;
    task: ITask | null = null;
    form: HTMLFormElement | null = null;

    constructor() {
        super(ID_TEMPLATE, ID_HOST);

        this.prepare();
        this.attachEvents();
    }

    private attachEvents() {
        this.element?.addEventListener('modal', this.modalHandler.bind(this), true);

        if (this.closeButton && this.cancelButton && this.element) {
            [this.closeButton, this.cancelButton].forEach((button: HTMLElement) => {
                button.addEventListener('click', this.toggleModal.bind(this));
            });
        }
        this.form?.addEventListener('submit', this.saveHandler.bind(this));
        this.saveButton?.addEventListener('click', this.saveHandler.bind(this));
    }

    private prepareButtons() {
        if (!this.element) return;

        this.closeButton = this.element.querySelector(`#${ID_ClOSE_BUTTON}`);
        this.cancelButton = this.element.querySelector(`#${ID_CANCEL_BUTTON}`);
        this.saveButton = this.element.querySelector(`#${ID_SAVE_BUTTON}`);
    }

    private prepareInputName() {
        if (!this.element) return;

        this.form = this.element.querySelector(`#${ID_FORM}`);
        this.inputName = this.element.querySelector(`#${ID_INPUT_NAME}`);
    }

    private prepareHeader() {
        if (!this.element) return;

        this.header = this.element.querySelector(`#${ID_HEADER}`);
    }

    private modalHandler(event: ModalEvent) {
        if (event.detail) {
            this.modal = event.detail.modal;
            this.task = event.detail.task;
            this.setContent();
        } else {
            this.clear();
        }

        this.toggleModal();
    }

    private setContent() {
        if (!this.inputName || !this.task) return;

        this.inputName.value = this.task.name;
        // document.activeElement?.blur();
        // this.inputName.tabIndex = -1;
        this.inputName.focus(); // dont work, dunno why :(
        // this.form?.click(); // dont work, dunno why :(

        if (!this.header || !this.modal) return;

        this.header.textContent = this.modal.header;
    }

    private clear() {
        this.modal = null;
        this.task = null;
    }

    private saveHandler(event: Event) {
        event.preventDefault();

        if (!this.inputName || !this.task) return;

        const task: ITask = { ...this.task, name: this.inputName?.value };
        const editEvent = new CustomEvent('edit', { detail: task });
        this.element?.dispatchEvent(editEvent);
    }

    private toggleModal() {
        this.element?.classList.toggle(ACTIVE_MODAL);
    }

    protected prepare() {
        this.prepareButtons();
        this.prepareInputName();
        this.prepareHeader();
    }

    protected render() {}

    protected destroy() {
        console.log('destroying');
    }
}
