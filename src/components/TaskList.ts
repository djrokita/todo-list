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
    private dragId: string | null = null;
    private targetId: string | null = null;

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
        this.element.addEventListener('dragend', this.dragendHandler);
        this.element.addEventListener('dragleave', this.dragleavedHandler);
    }

    @withAutobind
    private dropHandler(event: DragEvent) {
        event.preventDefault();
        this.dragId = event.dataTransfer.getData('text/plain');
        const target = event.target;

        if (target === this.list) {
            this.list.classList.remove('has-background-grey-lighter');
            this.dragId = null;
            return;
        }

        if (target instanceof Element) {
            const itemTarget = <HTMLElement>target.closest('.task');
            const dragTask = this.state.getTask(this.dragId);
            this.list.insertBefore(dragTask.elementRef(), itemTarget);
            this.targetId = itemTarget.dataset.id;
            this.list.classList.remove('has-background-grey-lighter');
        }
    }

    @withAutobind
    private dragoverHandler(event: DragEvent) {
        event.preventDefault();
        this.list.classList.add('has-background-grey-lighter');
    }

    @withAutobind
    private dragleavedHandler(event: DragEvent) {
        if ((event.relatedTarget as Element).closest(`#${ID_TASK_HOST}`) !== this.list) {
            this.list.classList.remove('has-background-grey-lighter');
        }
    }

    @withAutobind
    private dragendHandler(event: DragEvent) {
        if (event.dataTransfer.dropEffect === 'move') {
            this.state.reorderTasks(this.dragId, this.targetId);
        }

        this.dragId = null;
        this.targetId = null;
    }
}
