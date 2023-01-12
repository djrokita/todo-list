import { ITask, Status, TaskPayload, TaskPriority } from '../types';
import { generateID } from '../utils';
import { Validation } from '../services';
import { TaskItem } from './TaskItem';
import { State } from './State';
import { withAutobind } from '../decorators';

export class Task implements ITask {
    id: string;
    _name = '';
    status: Status;
    ref: TaskItem | null = null;
    private state: State;
    priority: TaskPriority = 'medium';
    startDate: string;
    endDate: string;

    constructor() {
        this.id = generateID();
        this.status = 'active';
        this.state = State.getInstance();
        this.startDate = new Date().toDateString();
        this.endDate = new Date().toDateString();
    }

    get name() {
        return this._name;
    }

    set name(value: string) {
        this.validateName(value);
        this._name = value.trim();
    }

    @withAutobind
    changeName(name: string) {
        this.validateName(name);
        this.name = name;
    }

    @withAutobind
    edit({ name, start, end, priority }: TaskPayload) {
        this.validateName(name);
        this.name = name;
        this.priority = priority;
        this.endDate = end;
        this.ref.update();
    }

    private validateName(name: string): void {
        Validation.isEmpty(name);
        Validation.hasMaxLenght(name, 10);
    }

    private getInstance() {
        if (this.state.getTask(this.id)) {
            this.ref = new TaskItem(this);
        }
    }

    @withAutobind
    saveTask(payload: TaskPayload) {
        this.name = payload.name;
        this.startDate = payload.start;
        this.endDate = payload.end;
        this.priority = payload.priority;

        this.state.addTask(this);
        this.getInstance();
    }

    remove() {
        const isRemoved = this.state.removeTask(this.id);

        if (isRemoved) {
            this.ref?.destroy();
        }
    }
}
