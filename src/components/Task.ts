import { ITask, Status } from '../types';
import { generateID } from '../utils';

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
        const trimmedName = name.trim();

        if (trimmedName) {
            return new Task(trimmedName);
        }
    }
}
