import { Component } from './Component';
import { openModalHandler } from '../utils';

const ID_TEMPLATE = 'welcome';
const ID_HOST = 'app';

export class Welcome extends Component<HTMLTemplateElement, HTMLDivElement> {
    button!: HTMLButtonElement;

    constructor() {
        super(ID_TEMPLATE, ID_HOST);

        this.prepare();
    }

    unMount(): void {
        this.destroy();
    }

    mount(): void {
        this.attachElement(ID_HOST);
    }

    protected prepare(): void {
        this.prepareButton();
        this.attachEvent();
    }

    protected prepareButton() {
        const buttonEl = this.element?.querySelector('button');

        if (buttonEl) {
            this.button = buttonEl;
        }
    }

    private attachEvent() {
        this.button.addEventListener('click', openModalHandler);
    }

    protected render() {
        console.log('rendering...');
    }
}
