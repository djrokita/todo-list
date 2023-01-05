import { Component } from './Component';
import { ModalEvent, TModal } from '../types';
import { withAutobind, withErrorMessage } from '../decorators';

const ID_TEMPLATE = 'modal';
const ID_HOST = 'app';
const ID_SAVE_BUTTON = 'modal-save';
const ID_CANCEL_BUTTON = 'modal-cancel';
const ID_ClOSE_BUTTON = 'modal-close';
const ID_INPUT_NAME = 'modal-input';
const ID_FORM = 'modal-form';
const ID_HEADER = 'modal-header';
const ACTIVE_MODAL = 'is-active';

@withErrorMessage
export class Modal extends Component<HTMLTemplateElement, HTMLDivElement> {
    closeButton: HTMLElement | null = null;
    cancelButton: HTMLElement | null = null;
    saveButton: HTMLElement | null = null;
    inputName: HTMLInputElement | null = null;
    header: HTMLParagraphElement | null = null;
    modal: TModal | null = null;
    handler: (value: string) => void;
    form: HTMLFormElement | null = null;
    error?: HTMLParagraphElement | null;
    validate: any;

    constructor() {
        super(ID_TEMPLATE, ID_HOST);

        this.prepare();
        this.attachEvents();
        this.handler = (e: string) => e;
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
        if (!this.header || !this.modal || !this.inputName) return;

        this.inputName.value = this.modal.value;
        this.header.textContent = this.modal.header;
    }

    private clear() {
        this.modal = null;

        if (this.error) {
            this.error.textContent = '';
        }

        this.handler = (e: string) => e;
    }

    @withAutobind
    private saveHandler(event: Event) {
        event.preventDefault();

        if (this.error) {
            return this.validate(this.actionHandler);
        }

        return this.actionHandler();
    }

    @withAutobind
    private actionHandler() {
        if (!this.inputName || !this.handler) return;

        this.handler(this.inputName.value);
        this.toggleHandler();
    }

    @withAutobind
    private toggleHandler() {
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

    protected render() {
        console.log('render...');
    }
}
