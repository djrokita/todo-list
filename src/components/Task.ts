import { ITask, Status } from '../types';
import { generateID } from '../utils';
import { Validation } from '../services';

export class Task implements ITask {
    id: string;
    name: string;
    status: Status;

    constructor(name: string) {
        this.id = generateID();
        this.name = name;
        this.status = 'active';
    }

    static init(name = '') {
        Validation.isEmpty(name);
        Validation.hasMaxLenght(name, 10);

        const trimmedName = name.trim();

        if (trimmedName) {
            return new Task(trimmedName);
        }
    }
}
