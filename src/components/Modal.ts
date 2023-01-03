import { Component } from './Component';
import { ModalEvent, TModal } from '../types';

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
    handler: (value: string) => void;
    form: HTMLFormElement | null = null;

    constructor() {
        super(ID_TEMPLATE, ID_HOST);

        this.prepare();
        this.attachEvents();
        this.handler = (e: string) => e;
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
            this.handler = event.detail.handler;
            this.setContent();
        } else {
            this.clear();
        }

        this.toggleModal();
    }

    private setContent() {
        if (!this.header || !this.modal || !this.inputName) return;

        this.inputName.value = this.modal.value;
        this.header.textContent = this.modal.header;
    }

    private clear() {
        this.modal = null;
        this.handler = (e: string) => e;
    }

    private saveHandler(event: Event) {
        event.preventDefault();

        if (!this.inputName || !this.handler) return;

        this.handler(this.inputName.value);
        this.toggleModal();
    }

    private toggleModal() {
        this.element?.classList.toggle(ACTIVE_MODAL);

        if (this.element?.classList.contains(ACTIVE_MODAL)) {
            this.inputName?.focus();
        } else {
            this.clear();
        }
    }

    protected prepare() {
        this.prepareButtons();
        this.prepareInputName();
        this.prepareHeader();
    }

    protected render() {}

    destroy() {
        console.log('destroying');
    }
}
