import { EditNamePayload, ITask, Status } from '../types';
import { generateID } from '../utils';
import { Validation } from '../services';
import { TaskItem } from './TaskItem';

export class Task implements ITask {
    id: string;
    name: string;
    status: Status;
    ref: TaskItem;
    // editName: (name: string) => CustomEvent<ITask>;

    constructor(name: string, private destroy: (id: string) => boolean) {
        Validation.isEmpty(name);
        Validation.hasMaxLenght(name, 10);

        this.id = generateID();
        this.name = name.trim();
        this.status = 'active';
        this.ref = new TaskItem(this);
    }

    editName(name: string): CustomEvent<EditNamePayload> {
        Validation.isEmpty(name);
        Validation.hasMaxLenght(name, 10);

        return new CustomEvent('edit', { detail: { id: this.id, name } });
    }

    remove() {
        Promise.resolve(this.destroy(this.id)).then((res: boolean) => {
            return res && this.ref.destroy();
        });
    }
}
