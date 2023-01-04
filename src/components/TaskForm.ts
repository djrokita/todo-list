import { Component } from './Component';
import { ErrorIsEmpty, ErrorMaxLength } from '../errors';
import { Task } from './Task';
import { withAutobind /*withErrorMessage*/ } from '../decorators';

const ID_TEMPLATE = 'task-form';
const ID_HOST = 'app';
const IS_HIDDEN = 'is-hidden';

// @withErrorMessage
export class TaskForm extends Component<HTMLTemplateElement, HTMLFormElement> {
    inputNameElement?: HTMLInputElement | null;
    error?: HTMLParagraphElement | null;

    constructor() {
        super(ID_TEMPLATE, ID_HOST);
        this.prepare();
        this.attachEvents();
    }

    @withAutobind
    private submitHandler(event: Event) {
        event.preventDefault();
        this.resetError();

        if (!this.inputNameElement) return;

        try {
            new Task(this.inputNameElement.value);
            this.inputNameElement.value = '';
        } catch (error) {
            if (!this.error) return;

            let errorMessage = '';
            this.error.classList.remove(IS_HIDDEN);

            if (error instanceof ErrorIsEmpty || error instanceof ErrorMaxLength) {
                errorMessage = error.message;
            } else {
                errorMessage = 'There is some error occured. Please check your input';
            }

            this.error.textContent = errorMessage;
        }
    }

    private attachEvents() {
        this.element?.addEventListener('submit', this.submitHandler);
    }

    private prepareInputs() {
        this.inputNameElement = this.element?.querySelector('input');
    }

    private prepareError() {
        this.error = this.element?.querySelector('p');
    }

    private resetError() {
        if (!this.error) return;

        this.error.classList.add(IS_HIDDEN);
        this.error.textContent = '';
    }

    protected prepare() {
        this.prepareInputs();
        this.prepareError();
    }

    protected render() {
        console.log('render');
    }

    destroy() {
        console.log('destroying');
    }
}
