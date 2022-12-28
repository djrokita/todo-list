import { Component } from './Component';
import { Task } from './Task';

const ID_TEMPLATE = 'task-form';
const ID_HOST = 'app';

export class TaskForm extends Component<HTMLTemplateElement, HTMLFormElement> {
    // addButton: HTMLButtonElement;
    inputNameElement?: HTMLInputElement | null;

    constructor() {
        super(ID_TEMPLATE, ID_HOST);
        this.prepareInputs();
        this.attachEvents();
    }

    private submitHandler(event: Event) {
        event.preventDefault();
        const task = Task.init(this.inputNameElement?.value);
        const addEvent = new CustomEvent('add', { detail: task, bubbles: false });
        const isDispatched = this.element?.dispatchEvent(addEvent);

        if (isDispatched && this.inputNameElement) {
            this.inputNameElement.value = '';
        }
    }

    private attachEvents() {
        this.element?.addEventListener('submit', this.submitHandler.bind(this));
    }

    private prepareInputs() {
        this.inputNameElement = this.element?.querySelector('input');
    }

    protected prepare() {
        console.log('preparing');
    }

    protected render() {
        console.log('render');
    }

    protected destroy() {
        console.log('destroying');
    }
}
