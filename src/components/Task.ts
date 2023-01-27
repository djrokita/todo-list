import { Status, TaskMeta, TaskPayload, TaskPriority } from '../types';
import { generateID } from '../utils';
import { Validation } from '../services';
import { TaskItem } from './TaskItem';
import { State } from './State';
import { withAutobind } from '../decorators';
import { BaseError } from '../errors';

export class Task {
    id: string;
    private _name = '';
    status: Status;
    private _item: TaskItem;
    private state: State;
    priority: TaskPriority = 'medium';
    private _startDate: string;
    private _endDate: string;
    errors: BaseError[] = [];

    static restoreTask(taskMeta: TaskMeta) {
        return new Task(taskMeta);
    }

    constructor(metaData?: TaskMeta) {
        this.id = generateID();
        this.state = State.getInstance();

        if (metaData) {
            this.name = metaData.name;
            this.status = metaData.status;
            this.priority = metaData.priority;
            this.startDate = metaData.start;
            this.endDate = metaData.end;

            this.state.addTask(this);
            this.getInstance();

            return;
        }

        this.generateInitData();
    }

    get name() {
        return this._name;
    }

    set name(value: string) {
        if (this.validateName(value)) {
            this._name = value.trim();
        }
    }

    get startDate() {
        return this._startDate;
    }

    set startDate(value: string) {
        if (this.endDate && this.validateDate(value, this.endDate)) {
            this._startDate = value;

            return;
        }

        this._startDate = value;
    }

    get endDate() {
        return this._endDate;
    }

    set endDate(value: string) {
        if (this.validateDate(this.startDate, value)) {
            this._endDate = value;
        }
    }

    elementRef() {
        return this._item.referance;
    }

    @withAutobind
    changeName(name: string) {
        this.name = name;
    }

    @withAutobind
    edit({ name, end, priority }: TaskPayload) {
        this.errors = [];

        this.name = name;
        this.priority = priority;
        this.endDate = end;
        this._item.update();

        return this.errors;
    }

    @withAutobind
    saveTask(payload: TaskPayload) {
        this.errors = [];

        this.name = payload.name;
        this.startDate = payload.start;
        this.endDate = payload.end;
        this.priority = payload.priority;
        this.state.addTask(this);
        this.getInstance();

        return this.errors;
    }

    remove() {
        const isRemoved = this.state.removeTask(this.id);

        if (isRemoved) {
            this._item?.destroy();
        }
    }

    hide() {
        this._item.visible = false;
    }

    show() {
        this._item.visible = true;
    }

    isVisible() {
        return this._item.visible;
    }

    private validateName(name: string) {
        const isEmptyError = Validation.isEmpty(name);
        const maxLengthError = Validation.hasMaxLenght(name, 10);

        isEmptyError && this.errors.push(isEmptyError);
        maxLengthError && this.errors.push(maxLengthError);

        return this.errors.length === 0;
    }

    private validateDate(start: string, end: string) {
        const isDateError = Validation.idEndDateCorrect(start, end);
        isDateError && this.errors.push(isDateError);

        return this.errors.length === 0;
    }

    private getInstance() {
        if (this.state.getTask(this.id)) {
            this._item = new TaskItem(this);
        }
    }

    private generateInitData() {
        this.status = 'active';
        this._startDate = new Date().toDateString();
        this._endDate = new Date().toDateString();
    }
}
