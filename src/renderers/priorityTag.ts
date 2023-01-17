import { PRIORITIES } from '../constants';
import { TaskPriority } from '../types';

export function getPriorityTag(priority: TaskPriority): HTMLSpanElement {
    const tagElement = document.createElement('span');
    tagElement.classList.add('tag', 'is-medium' /*'is-light'*/);

    switch (priority) {
        case 'low':
            tagElement.classList.add('is-info');
            break;
        case 'medium':
            tagElement.classList.add('is-warning');
            break;
        case 'high':
            tagElement.classList.add('is-danger');
    }

    tagElement.textContent = PRIORITIES[priority];

    return tagElement;
}
