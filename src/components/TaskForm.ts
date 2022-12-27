import { Component } from './Component';

const ID_TEMPLATE = 'task-form';
const ID_HOST = 'app';

export class TaskForm extends Component<HTMLTemplateElement, HTMLFormElement> {
    constructor() {
        super(ID_TEMPLATE, ID_HOST);
    }

    // protected prepare() {
    //     console.log('preparing');
    // }

    protected render() {
        console.log('render');
    }

    protected destroy() {
        console.log('destroying');
    }
}
