export interface ITask {
    id: string;
    name: string;
    status: Status;
    startDate?: Date;
    endDate?: Date;
    ownerID?: string;
}

export type TModal = {
    header: string;
    // content: HTMLElement;
    value: string;
};

export type ModalPayload = { modal: TModal; handler: (value: string) => void };
export type EditNamePayload = { id: string; name: string };

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
        modal: ModalEvent;
    }
}

export type TaskEvent = CustomEvent<ITask>;
export type EditNameEvent = CustomEvent<EditNamePayload>;
export type ModalEvent = CustomEvent<ModalPayload>;
