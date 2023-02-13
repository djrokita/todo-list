import { Task } from './components/Task';
import { ModalPayload, TModal } from './types';

const ONE_DAY = 86400000;

function getTodayDate() {
    return new Date().toJSON().slice(0, 10);
}

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
    const today = getTodayDate();

    return Math.floor((new Date(endDate).valueOf() - new Date(today).valueOf()) / ONE_DAY);
}

export function getProgressDays(endDate: string, startDate: string) {
    const today = getTodayDate();
    const daysLeft = (new Date(today).valueOf() - new Date(startDate).valueOf()) / ONE_DAY + 1;
    const daysRange = (new Date(endDate).valueOf() - new Date(startDate).valueOf()) / ONE_DAY || 1;

    return Math.ceil((daysLeft / daysRange) * 100);
}

export function getProgressStyle(value: number) {
    if (value <= 0) return 'is-danger';
    if (value < 30) return 'is-success';
    if (value < 60) return 'is-warning';

    return 'is-danger';
}
