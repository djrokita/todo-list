import '../main.scss';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { State } from './components/State';
import { Modal } from './components/Modal';
// import { AddEvent } from './types';

const start = 'Starting...';
console.log('🚀 ~ file: index.ts:2 ~ start', start);

const state = State.getInstance();
const tasks = state.task;
new TaskForm();
new TaskList(tasks);
new Modal();
