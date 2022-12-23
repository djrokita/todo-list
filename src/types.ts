export type Task = {
    name: string;
    status: Status;
    startDate?: Date;
    endDate?: Date;
    ownerID?: string;
};

export type ActiveStatus = 'active';
export type CompletedStatus = 'completed';
export type RemovedStatus = 'removed';

export type Status = ActiveStatus | CompletedStatus | RemovedStatus;
