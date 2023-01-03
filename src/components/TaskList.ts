import { Component } from './Component';
import { ITask } from '../types';
import { TaskItem } from './TaskItem';

const ID_TEMPLATE = 'task-list';
const ID_HOST = 'app';

export class TaskList extends Component<HTMLTemplateElement, HTMLDivElement> {
    constructor() {
        super(ID_TEMPLATE, ID_HOST);

        this.prepare();
        this.attachEvents();
    }

    private attachEvents() {
        this.element?.addEventListener('update', this.updateHandler.bind(this));
    }

    private updateHandler(event: Event) {
        // console.log('LIST', this.tasks);
        this.render();
    }

    private clearList() {
        if (this.element?.children) {
            this.element.replaceChildren('');
        }
    }

    protected prepare() {}

    protected render() {}

    destroy() {
        console.log('destroying');
    }
}
