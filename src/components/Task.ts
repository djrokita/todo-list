import { Status, TaskPayload, TaskPriority } from '../types';
import { generateID } from '../utils';
import { Validation } from '../services';
import { TaskItem } from './TaskItem';
import { State } from './State';
import { withAutobind } from '../decorators';
import { BaseError } from '../errors';

export class Task {
    id: string;
    _name = '';
    status: Status;
    ref: TaskItem | null = null;
    private state: State;
    priority: TaskPriority = 'medium';
    _startDate: string;
    _endDate: string;
    errors: BaseError[] = [];

    constructor() {
        this.id = generateID();
        this.status = 'active';
        this.state = State.getInstance();
        this._startDate = new Date().toDateString();
        this._endDate = new Date().toDateString();
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
        if (this.endDate) {
            this.validateDate(value, this.endDate);
        }
        this._startDate = value;
    }

    get endDate() {
        return this._endDate;
    }

    set endDate(value: string) {
        this.validateDate(this.startDate, value);
        this._endDate = value;
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
        this.ref.update();

        return this.errors;
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
            this.ref = new TaskItem(this);
        }
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
            this.ref?.destroy();
        }
    }
}
