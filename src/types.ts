export interface ITask {
    id: string;
    name: string;
    status: Status;
    startDate?: Date;
    endDate?: Date;
    ownerID?: string;
}

export type ActiveStatus = 'active';
export type CompletedStatus = 'completed';
export type RemovedStatus = 'removed';

export type Status = ActiveStatus | CompletedStatus | RemovedStatus;

declare global {
    interface HTMLElementEventMap {
        add: TaskEvent;
        remove: TaskEvent;
        edit: TaskEvent;
        check: TaskEvent;
        update: Event;
    }
}

export type TaskEvent = CustomEvent<ITask>;
