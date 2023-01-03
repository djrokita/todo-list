import { generateID } from '../utils';

export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    protected _id;
    protected template?: HTMLTemplateElement;
    protected host?: U;
    protected element?: T;

    constructor(templateId: string, hostId: string) {
        this._id = generateID();
        this.prepareNode(templateId, hostId);
    }

    destroy() {
        this.element?.remove();
    }

    protected prepareElement(id: string) {
        this.template = document.getElementById(id) as HTMLTemplateElement;
        this.element = this.template.content.firstElementChild?.cloneNode(true) as T;
    }

    protected attachElement(id: string) {
        this.host = document.getElementById(id) as U;

        if (this.element) {
            this.host?.append(this.element);
        }
    }

    protected prepareNode(templateId: string, hostId: string) {
        this.prepareElement(templateId);
        this.attachElement(hostId);
    }

    protected abstract prepare(): void;

    protected abstract render(): void;
}
