import { Component } from './Component';
import { ITask, ModalEvent } from '../types';

const ID_TEMPLATE = 'modal';
const ID_HOST = 'app';
const ID_SAVE_BUTTON = 'modal-save';
const ID_CANCEL_BUTTON = 'modal-cancel';
const ID_ClOSE_BUTTON = 'modal-close';

const ACTIVE_MODAL = 'is-active';

export class Modal extends Component<HTMLTemplateElement, HTMLDivElement> {
    closeButton: HTMLElement | null = null;
    cancelButton: HTMLElement | null = null;
    saveButton: HTMLElement | null = null;

    constructor() {
        super(ID_TEMPLATE, ID_HOST);

        this.prepare();
        this.attachEvents();
        // this.element?.classList.add(ACTIVE_MODAL);
    }

    private attachEvents() {
        this.element?.addEventListener('modal', this.modalHandler.bind(this), true);

        if (this.closeButton && this.cancelButton && this.element) {
            [this.closeButton, this.cancelButton].forEach((button: HTMLElement) => {
                button.addEventListener('click', this.toggleModal.bind(this));
            });
        }
    }

    private prepareButtons() {
        if (this.element) {
            this.closeButton = this.element.querySelector(`#${ID_ClOSE_BUTTON}`);
            this.cancelButton = this.element.querySelector(`#${ID_CANCEL_BUTTON}`);
            this.saveButton = this.element.querySelector(`#${ID_SAVE_BUTTON}`);
        }
    }

    private modalHandler(event: ModalEvent) {
        console.log('MODAL', event);
        this.toggleModal();
    }

    private toggleModal() {
        this.element?.classList.toggle(ACTIVE_MODAL);
    }

    private updateHandler(event: Event) {
        this.render();
    }

    protected prepare() {
        this.prepareButtons();
        console.log('preparing');
    }

    protected render() {}

    protected destroy() {
        console.log('destroying');
    }
}
