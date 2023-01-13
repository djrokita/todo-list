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
