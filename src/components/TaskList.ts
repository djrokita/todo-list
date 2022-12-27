import { Component } from './Component';
import { Task } from '../types';
import { TaskItem } from './TaskItem';

const ID_TEMPLATE = 'task-list';
const ID_HOST = 'app';

export class TaskList extends Component<HTMLTemplateElement, HTMLFormElement> {
    tasks: Task[] = [
        {
            ownerID: 'abc',
            name: 'Test task',
            status: 'active',
        },
    ];

    constructor() {
        super(ID_TEMPLATE, ID_HOST);

        this.render();
    }

    // protected prepare() {
    //     console.log('preparing');
    // }

    protected render() {
        for (const task of this.tasks.slice()) {
            new TaskItem(task);
        }
        console.log('rendering list');
    }

    protected destroy() {
        console.log('destroying');
    }
}
