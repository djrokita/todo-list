import { Component } from './Component';
import { withErrorMessage } from '../decorators';
import { openModalHandler } from '../utils';

const ID_TEMPLATE = 'task-form';
const ID_HOST = 'app';
const ID_NEW = 'task-new';

@withErrorMessage
export class TaskForm extends Component<HTMLTemplateElement, HTMLFormElement> {
    inputNameElement?: HTMLInputElement;
    error?: HTMLParagraphElement;
    validate: any;
    addButton: HTMLButtonElement;

    constructor() {
        super(ID_TEMPLATE, ID_HOST);
        this.prepare();
        this.attachEvents();
    }

    unMount(): void {
        this.destroy();
    }

    mount(): void {
        this.attachElement(ID_HOST);
    }

    private attachEvents() {
        this.addButton?.addEventListener('click', openModalHandler);
    }

    private prepareInputs() {
        this.inputNameElement = this.element?.querySelector('input');
    }

    private prepareButtons() {
        this.addButton = this.element?.querySelector(`#${ID_NEW}`);
    }

    protected prepare() {
        this.prepareInputs();
        this.prepareButtons();
    }

    protected render() {
        console.log('render');
    }
}
