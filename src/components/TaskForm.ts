import { Component } from './Component';
import { withAutobind, withErrorMessage } from '../decorators';
import { openModalHandler } from '../utils';
import { State } from './State';

const ID_TEMPLATE = 'task-form';
const ID_HOST = 'app';
const ID_NEW = 'task-new';
const ID_SAVE = 'task-save';

@withErrorMessage
export class TaskForm extends Component<HTMLTemplateElement, HTMLFormElement> {
    input?: HTMLInputElement;
    error?: HTMLParagraphElement;
    validate: any;
    private addButton: HTMLButtonElement;
    private saveButton: HTMLButtonElement;
    private state: State;

    constructor() {
        super(ID_TEMPLATE, ID_HOST);
        this.state = State.getInstance();
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
        this.addButton.addEventListener('click', openModalHandler);
        this.saveButton.addEventListener('click', this.saveHandler);
        this.input.addEventListener('input', this.inputHandler);
    }

    private prepareInput() {
        this.input = this.element?.querySelector('input');
    }

    private prepareButtons() {
        this.addButton = this.element?.querySelector(`#${ID_NEW}`);
        this.saveButton = this.element?.querySelector(`#${ID_SAVE}`);
    }

    @withAutobind
    private saveHandler() {
        return this.state.storeTasks();
    }

    @withAutobind
    private inputHandler(event: Event | InputEvent) {
        if (event instanceof InputEvent) {
            const target = event.target as HTMLInputElement;
            this.searchHandler(target.value.trim());
            this.input.focus();
        }
    }

    private searchHandler(value: string) {
        this.state.search = value;
    }

    protected prepare() {
        this.prepareInput();
        this.prepareButtons();
    }

    protected render() {
        console.log('render');
    }
}
