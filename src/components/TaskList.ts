import { ID_TASK_HOST } from '../constants';
import { withAutobind } from '../decorators';
import { SubscribeAction } from '../types';
import { Component } from './Component';
import { State } from './State';

const ID_TEMPLATE = 'task-list';
const ID_HOST = 'app';
const ID_PLACEHOLDER = 'list-placeholder';

const SEARCH_EMPTY_LIST_TEXT = 'No tasks found';
const REMOVE_EMPTY_LIST_TEXT = 'No tasks available';

export class TaskList extends Component<HTMLTemplateElement, HTMLDivElement> {
    list: HTMLDivElement;
    placeholder: HTMLDivElement;
    state: State;

    constructor() {
        super(ID_TEMPLATE, ID_HOST);
        this.state = State.getInstance();
        this.prepare();
    }

    unMount(): void {
        this.destroy();
    }

    mount(): void {
        this.attachElement(ID_HOST);
    }

    @withAutobind
    onSearchView() {
        const isHidden = this.list.childElementCount === 0;

        this.toggleView(isHidden, SEARCH_EMPTY_LIST_TEXT);
    }

    @withAutobind
    onChangeTaskCountView() {
        const isHidden = !this.state.taskCount();

        this.toggleView(isHidden, REMOVE_EMPTY_LIST_TEXT);
    }

    toggleView(isHidden: boolean, message: string) {
        if (isHidden) {
            this.list.classList.add('is-hidden');
            this.placeholder.classList.remove('is-hidden');
            this.placeholder.lastElementChild.textContent = message;
        } else {
            this.list.classList.remove('is-hidden');
            this.placeholder.classList.add('is-hidden');
            this.placeholder.lastElementChild.textContent = '';
        }
    }

    protected prepare() {
        this.list = this.element.querySelector(`#${ID_TASK_HOST}`);
        this.placeholder = this.element.querySelector(`#${ID_PLACEHOLDER}`);

        this.connect();
        this.attachEvents();
    }

    protected render() {
        console.log('rendering...');
    }

    private connect() {
        const actionSearch: SubscribeAction = {
            type: 'search',
            handler: this.onSearchView,
        };

        const actionRemove: SubscribeAction = {
            type: 'remove',
            handler: this.onChangeTaskCountView,
        };

        const actionAdd: SubscribeAction = {
            type: 'add',
            handler: this.onChangeTaskCountView,
        };

        this.state.subscribe(actionSearch);
        this.state.subscribe(actionRemove);
        this.state.subscribe(actionAdd);
    }

    private attachEvents() {
        this.element.addEventListener('dragover', this.dragoverHandler);
        this.element.addEventListener('drop', this.dropHandler);
    }

    @withAutobind
    private dropHandler(event: DragEvent) {
        event.preventDefault();
        const itemId = event.dataTransfer.getData('text/plain');
        const target = event.target;

        if (target instanceof Element) {
            const itemTarget = target.closest('.box');
            const movedReferance = this.state.tasks[itemId];
            this.list.insertBefore(movedReferance.ref.elementRef, itemTarget);
        }
    }

    @withAutobind
    private dragoverHandler(event: DragEvent) {
        event.preventDefault();
        // console.log('dragover ~ event', event);
    }
}
