import { ID_TASK_HOST } from '../constants';
import { SubscribeAction } from '../types';
import { Component } from './Component';
import { State } from './State';

const ID_TEMPLATE = 'task-list';
const ID_HOST = 'app';
const ID_PLACEHOLDER = 'list-placeholder';

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

    prepareView() {
        if (this.list.childElementCount === 0) {
            this.list.classList.add('is-hidden');
            this.placeholder.classList.remove('is-hidden');
        } else {
            this.list.classList.remove('is-hidden');
            this.placeholder.classList.add('is-hidden');
        }
    }

    protected prepare() {
        this.list = this.element.querySelector(`#${ID_TASK_HOST}`);
        this.placeholder = this.element.querySelector(`#${ID_PLACEHOLDER}`);

        this.connect();
    }

    protected render() {
        console.log('rendering...');
    }

    private connect() {
        const action: SubscribeAction = {
            type: 'search',
            handler: this.prepareView.bind(this),
        };

        this.state.subscribe(action);
    }
}
