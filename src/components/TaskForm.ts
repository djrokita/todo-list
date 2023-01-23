import { Component } from './Component';
import { withAutobind, withErrorMessage } from '../decorators';
import { openModalHandler } from '../utils';
import { State } from './State';
import { RENDERER } from '../renderers';
import { PRIORITIES } from '../constants';
import { TaskFilterPriority } from '../types';

const ID_TEMPLATE = 'task-form';
const ID_HOST = 'app';
const ID_NEW = 'task-new';
const ID_SAVE = 'task-save';
const ID_PRIORITY = 'task-priority';

@withErrorMessage
export class TaskForm extends Component<HTMLTemplateElement, HTMLFormElement> {
    input?: HTMLInputElement;
    error?: HTMLParagraphElement;
    validate: any;
    private addButton: HTMLButtonElement;
    private saveButton: HTMLButtonElement;
    private prioritySelect: HTMLButtonElement;
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
        this.prioritySelect.addEventListener('change', this.selectPriorityHandler);
    }

    private prepareInput() {
        this.input = this.element?.querySelector('input');
    }

    private prepareButtons() {
        this.addButton = this.element?.querySelector(`#${ID_NEW}`);
        this.saveButton = this.element?.querySelector(`#${ID_SAVE}`);
        this.prioritySelect = this.element?.querySelector(`#${ID_PRIORITY}`);

        const optionElemens = RENDERER.getSelectOption(PRIORITIES);
        optionElemens.forEach((option: HTMLOptionElement) => this.prioritySelect.append(option));
    }

    @withAutobind
    private saveHandler() {
        return this.state.storeTasks();
    }

    @withAutobind
    private inputHandler(event: Event) {
        const target = event.target as HTMLInputElement;
        this.searchHandler(target.value.trim());
        this.input.focus();
    }

    @withAutobind
    private selectPriorityHandler(event: Event) {
        const target = event.target as HTMLInputElement;

        if (target.value === 'all' || target.value === 'low' || target.value === 'medium' || target.value === 'high') {
            this.filterHandler(target.value);
        }
    }

    private searchHandler(value: string) {
        this.state.search = value;
    }

    private filterHandler(value: TaskFilterPriority) {
        this.state.filter = value;
    }

    protected prepare() {
        this.prepareInput();
        this.prepareButtons();
    }

    protected render() {
        console.log('render');
    }
}
