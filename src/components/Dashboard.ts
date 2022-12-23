import { BaseElement } from './BaseElement';

export class Dashboard extends BaseElement {
    constructor(name: string, private _title: string) {
        super(name);
    }

    set title(value: string) {
        this._title = value;
    }

    get title() {
        return this._title;
    }

    // create() {

    // }
}
