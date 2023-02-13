import { Task } from './components/Task';
import { ModalPayload, TModal } from './types';

export function generateID() {
    return (Math.random() * 100).toString(16).replace(/[.]/g, '');
}

export function openModalHandler() {
    const modalRef = <HTMLTemplateElement>document.querySelector('.modal');

    const task = new Task();

    const modal: TModal = {
        type: 'create',
        name: task.name,
        start: task.startDate,
        end: task.endDate,
        priority: task.priority,
    };
    const detail: ModalPayload = { modal, handler: task.saveTask };
    const modalEvent = new CustomEvent('modal', { detail });
    modalRef?.dispatchEvent(modalEvent);
}

export function getDaysLeft(endDate: string) {
    const oneDay = 86400000;
    const today = new Date().toJSON().slice(0, 10);

    return Math.floor((new Date(endDate).valueOf() - new Date(today).valueOf()) / oneDay);
}

export function getProgressDays(endDate: string, startDate: string) {
    const daysLeft = new Date().getTime() - new Date(startDate).getTime();
    const daysRange = new Date(endDate).getTime() - new Date(startDate).getTime() || 1;

    return Math.ceil((daysLeft / daysRange) * 100);
}

export function getProgressStyle(value: number) {
    if (value < 0) return 'is-danger';
    if (value < 30) return 'is-success';
    if (value < 60) return 'is-warning';

    return 'is-danger';
}
