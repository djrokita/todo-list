import { Component } from './Component';
import { Task } from './Task';
import { withAutobind, withErrorMessage } from '../decorators';

const ID_TEMPLATE = 'task-form';
const ID_HOST = 'app';

@withErrorMessage
export class TaskForm extends Component<HTMLTemplateElement, HTMLFormElement> {
    inputNameElement?: HTMLInputElement | null;
    error?: HTMLParagraphElement | null;
    validate: any;

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

    @withAutobind
    private submitHandler(event: Event) {
        event.preventDefault();

        if (this.error) {
            return this.validate(this.createTask);
        }

        return this.createTask();
    }

    @withAutobind
    private createTask() {
        // if (!this.inputNameElement) return;
        // new Task();
        // this.inputNameElement.value = '';
    }

    private attachEvents() {
        this.element?.addEventListener('submit', this.submitHandler);
    }

    private prepareInputs() {
        this.inputNameElement = this.element?.querySelector('input');
    }

    protected prepare() {
        this.prepareInputs();
    }

    protected render() {
        console.log('render');
    }
}
