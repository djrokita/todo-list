export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    protected template?: HTMLTemplateElement;
    protected host?: U;
    protected element?: T;

    constructor(templateId: string, hostId: string, private ahead = false) {
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
        if (!this.element) return;

        this.host = document.getElementById(id) as U;

        this.ahead ? this.host?.prepend(this.element) : this.host?.append(this.element);
    }

    protected prepareNode(templateId: string, hostId: string) {
        this.prepareElement(templateId);
        this.attachElement(hostId);
    }

    protected abstract prepare(): void;

    protected abstract render(): void;
}
