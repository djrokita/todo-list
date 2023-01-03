import { EditNamePayload, ITask, Status } from '../types';
import { generateID } from '../utils';
import { Validation } from '../services';
import { TaskItem } from './TaskItem';

export class Task implements ITask {
    id: string;
    status: Status;
    ref: TaskItem;

    constructor(private _name: string, private destroy: (id: string) => boolean) {
        Validation.isEmpty(_name);
        Validation.hasMaxLenght(_name, 10);

        this.id = generateID();
        this.name = _name.trim();
        this.status = 'active';
        this.ref = new TaskItem(this);
    }

    get name() {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    editName(name: string): CustomEvent<EditNamePayload> {
        Validation.isEmpty(name);
        Validation.hasMaxLenght(name, 10);

        return new CustomEvent('edit', { detail: { id: this.id, name } });
    }

    changeName(name: string) {
        this.name = name;
        this.ref.update();
    }

    remove() {
        Promise.resolve(this.destroy(this.id)).then((res: boolean) => {
            return res && this.ref.destroy();
        });
    }
}
