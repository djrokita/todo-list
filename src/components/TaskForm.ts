import { Component } from './Component';
import { Task } from './Task';
import { ErrorIsEmpty, ErrorMaxLength } from '../errors';

const ID_TEMPLATE = 'task-form';
const ID_HOST = 'app';
const IS_HIDDEN = 'is-hidden';

export class TaskForm extends Component<HTMLTemplateElement, HTMLFormElement> {
    inputNameElement?: HTMLInputElement | null;
    error?: HTMLParagraphElement | null;

    constructor() {
        super(ID_TEMPLATE, ID_HOST);
        this.prepare();
        this.attachEvents();
    }

    private submitHandler(event: Event) {
        event.preventDefault();
        this.resetError();

        try {
            const task = Task.init(this.inputNameElement?.value);
            const addEvent = new CustomEvent('add', { detail: task, bubbles: false });
            const isDispatched = this.element?.dispatchEvent(addEvent);

            if (isDispatched && this.inputNameElement) {
                this.inputNameElement.value = '';
            }
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
        this.element?.addEventListener('submit', this.submitHandler.bind(this));
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

    protected destroy() {
        console.log('destroying');
    }
}
