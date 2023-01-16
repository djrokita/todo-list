export interface ITask {
    id: string;
    _name: string;
    status: Status;
    startDate: TaskDate;
    endDate: TaskDate;
    priority: TaskPriority;
    ownerID?: string;
}

export type TModal = {
    type: ModalType;
    // content: HTMLElement;
    name: string;
    start: TaskDate;
    end: TaskDate;
    priority: TaskPriority;
};

export type TaskPayload = {
    name: string;
    end: TaskDate;
    start: TaskDate;
    priority: TaskPriority;
};

type TaskPriorityLow = 'low';
type TaskPriorityMedium = 'medium';
type TaskPriorityHigh = 'high';

type TaskDate = string;

type ModalType = 'create' | 'edit';

export type TaskPriority = TaskPriorityLow | TaskPriorityMedium | TaskPriorityHigh;

export type ModalHandler = (payload: TaskPayload) => any[];
export type ModalPayload = { modal: TModal; handler: ModalHandler };
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
