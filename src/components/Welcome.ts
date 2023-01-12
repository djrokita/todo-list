import { Component } from './Component';
import { withAutobind } from '../decorators';
import { TModal, ModalPayload } from '../types';
import { Task } from './Task';

const ID_TEMPLATE = 'welcome';
const ID_HOST = 'app';

export class Welcome extends Component<HTMLTemplateElement, HTMLDivElement> {
    button!: HTMLButtonElement;

    constructor() {
        super(ID_TEMPLATE, ID_HOST);

        this.prepare();
    }

    unMount(): void {
        this.destroy();
    }

    mount(): void {
        this.attachElement(ID_HOST);
    }

    protected prepare(): void {
        this.prepareButton();
        this.attachEvent();
    }

    protected prepareButton() {
        const buttonEl = this.element?.querySelector('button');

        if (buttonEl) {
            this.button = buttonEl;
        }
    }

    private attachEvent() {
        this.button.addEventListener('click', this.buttonHandler);
    }

    @withAutobind
    private buttonHandler() {
        const modalRef = <HTMLTemplateElement>document.querySelector('.modal');

        const task = new Task();

        const modal: TModal = {
            type: 'create',
            name: task.name,
            start: task.startDate,
            end: task.endDate,
            priority: task.priority,
        };
        const detail: ModalPayload = { modal, handler: task.saveTask };
        const modalEvent = new CustomEvent('modal', { detail });
        modalRef?.dispatchEvent(modalEvent);
    }

    protected render() {
        console.log('rendering...');
    }
}
