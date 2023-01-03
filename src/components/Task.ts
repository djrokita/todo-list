import { ITask, Status } from '../types';
import { generateID } from '../utils';
import { Validation } from '../services';
import { TaskItem } from './TaskItem';
import { State } from './State';

export class Task implements ITask {
    id: string;
    status: Status;
    ref: TaskItem | null = null;
    private state: State;

    constructor(private _name: string) {
        this.validateName(_name);
        this.id = generateID();
        this.name = _name.trim();
        this.status = 'active';
        this.state = State.getInstance();
        this.getInstance();
    }

    get name() {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    changeName(name: string) {
        this.validateName(name);
        this.name = name;
        this.ref?.update();
    }

    private validateName(name: string): void {
        Validation.isEmpty(name);
        Validation.hasMaxLenght(name, 10);
    }

    private getInstance() {
        const isStored = this.state.addTask(this);

        if (isStored) {
            this.ref = new TaskItem(this);
        }
    }

    remove() {
        const isRemoved = this.state.removeTask(this.id);

        if (isRemoved) {
            this.ref?.destroy();
        }
    }
}
