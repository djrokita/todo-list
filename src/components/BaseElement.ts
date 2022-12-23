import { generateID } from '../utils';

export class BaseElement {
    protected _id = '';
    protected _name = '';
    protected _node: HTMLElement;

    constructor(name: string) {
        this._name = name;
        this._id = generateID();
        this._node = document.createElement('div');
    }

    get name(): string {
        return this._name;
    }

    get node(): HTMLElement {
        return this._node;
    }

    set node(value: HTMLElement) {
        this._node = value;
    }

    render(parent: HTMLElement) {
        if (this.node) {
            parent.append(this.node);
        }
    }

    destroy() {
        this.node.remove();
        this._name = '';
    }
}
