import { Component } from './Component';

const ID_TEMPLATE = 'task-list';
const ID_HOST = 'app';

export class TaskList extends Component<HTMLTemplateElement, HTMLDivElement> {
    constructor() {
        super(ID_TEMPLATE, ID_HOST);
    }

    unMount(): void {
        this.destroy();
    }

    mount(): void {
        this.attachElement(ID_HOST);
    }

    protected prepare() {
        console.log('preparing...');
    }

    protected render() {
        console.log('rendering...');
    }
}
