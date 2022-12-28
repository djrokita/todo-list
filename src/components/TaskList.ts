import { Component } from './Component';
import { ITask } from '../types';
import { TaskItem } from './TaskItem';

const ID_TEMPLATE = 'task-list';
const ID_HOST = 'app';

export class TaskList extends Component<HTMLTemplateElement, HTMLFormElement> {
    // tasks: ITask[] = [
    //     {
    //         ownerID: 'abc',
    //         name: 'Test task',
    //         status: 'active',
    //     },
    // ];

    constructor(private tasks: ITask[]) {
        super(ID_TEMPLATE, ID_HOST);

        this.prepare();
        this.attachEvents();
    }

    private attachEvents() {
        this.element?.addEventListener('update', this.updateHandler.bind(this));
    }

    private updateHandler(event: Event) {
        console.log('LIST', event);
        this.render();
    }

    // protected prepare() {
    //     console.log('preparing');
    // }

    private renderList() {
        for (const task of this.tasks.slice()) {
            new TaskItem(task);
        }
    }

    private clearList() {
        if (this.element?.children) {
            this.element.replaceChildren('');
        }
    }

    protected prepare() {
        this.renderList();
    }

    protected render() {
        this.clearList();
        this.renderList();
    }

    protected destroy() {
        console.log('destroying');
    }
}
