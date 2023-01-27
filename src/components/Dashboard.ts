import { STORAGE_KEY_TASKS } from '../constants';
import { SubscribeAction, TaskMeta } from '../types';
import { Modal } from './Modal';
import { State } from './State';
import { Task } from './Task';
import { TaskForm } from './TaskForm';
import { TaskList } from './TaskList';
import { TaskPanel } from './TaskPanel';
import { Welcome } from './Welcome';

export class Dashboard {
    state: State;
    form!: TaskForm;
    list!: TaskList;
    welcome!: Welcome;
    panel!: TaskPanel;

    constructor() {
        this.state = State.getInstance();
        this.prepareWelcome();
        this.preparePanel();
        this.prepareModal();
        this.retrieveStorageData();
        this.prepareView();
        this.connect();
    }

    private prepareWelcome() {
        this.welcome = new Welcome();
    }

    private preparePanel() {
        this.panel = new TaskPanel();
    }

    private prepareView(): void {
        if (Object.keys(this.state.tasks).length) {
            this.welcome.unMount();
            this.panel.mount();
            return;
        }

        this.panel.unMount();
        this.welcome.mount();
    }

    private prepareModal() {
        new Modal();
    }

    private connect() {
        const actionAdd: SubscribeAction = {
            type: 'add',
            handler: this.prepareView.bind(this),
        };

        this.state.subscribe(actionAdd);
    }

    private retrieveStorageData() {
        const storedTasks = localStorage.getItem(STORAGE_KEY_TASKS);

        if (storedTasks) {
            const metaTasks: TaskMeta[] = JSON.parse(storedTasks).reverse();
            metaTasks.forEach((meta: TaskMeta) => Task.restoreTask(meta));
        }
    }
}
