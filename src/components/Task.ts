import { ITask, Status } from '../types';

export class Task implements ITask {
    name: string;
    status: Status;

    constructor(name: string) {
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
