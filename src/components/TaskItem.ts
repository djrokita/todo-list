import { BaseElement } from './BaseElement';
import { CREATOR } from '../renderers/index';

const ICON_EDIT = 'fa-solid fa-pen';
const ICON_REMOVE = 'fa-solid fa-trash-can';
const ICON_COMPLETE = 'fa-solid fa-square-check';

export class TaskItem extends BaseElement {
    editButton: HTMLElement | null = null;
    removeButton: HTMLElement | null = null;
    completeButton: HTMLElement | null = null;
    nameArea: HTMLElement | null = null;
    box: HTMLElement | null = null;

    constructor(name: string) {
        super(name);
        this.create();
    }

    private create() {
        this.createEditButton();
        this.createRemoveButton();
        this.createCompleteButton();
        this.createNameArea();

        let field, nameField, mainField: HTMLElement;

        if (this.editButton && this.removeButton) {
            field = CREATOR.field([this.editButton, this.removeButton], false);
            field.classList.add('is-grouped');
        }

        if (this.completeButton && this.nameArea) {
            nameField = CREATOR.field([this.completeButton, this.nameArea], false);
            const control = CREATOR.utils.getControl(nameField, 1);
            control.classList.add('is-flex', 'is-align-items-center', 'px-4');
        }

        if (field && nameField) {
            mainField = CREATOR.field([nameField, field], false);
            const control = CREATOR.utils.getControl(mainField);
            control.classList.add('is-expanded');
            this.box = CREATOR.box();
            this.box.classList.add('has-background-success-light');
            this.box.append(mainField);
        }
    }

    private createButton(icon: string) {
        const button = CREATOR.button(icon);
        button.classList.add('is-outlined');

        return button.cloneNode(true) as HTMLElement;
    }

    private createEditButton() {
        this.editButton = this.createButton(ICON_EDIT);
        this.editButton.classList.add('is-info');
    }

    private createRemoveButton() {
        this.removeButton = this.createButton(ICON_REMOVE);
        this.removeButton.classList.add('is-danger');
    }

    private createCompleteButton() {
        this.completeButton = this.createButton(ICON_COMPLETE);
        this.completeButton.classList.add('is-success');
    }

    private createNameArea() {
        this.nameArea = document.createElement('div');
        this.nameArea.className = 'block is-dark has-text-black';
        this.nameArea.parentElement?.classList.add('is-flex', 'is-align-items-center', 'px-4');
        this.nameArea.textContent = this.name;
    }

    render() {
        const list = document.getElementById('list');

        if (this.box) {
            list?.append(this.box);
        }
    }
}
