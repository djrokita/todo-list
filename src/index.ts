import '../main.scss';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

// import { TaskItem } from './components/TaskItem';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';

const start = 'Starting...';
console.log('🚀 ~ file: index.ts:2 ~ start', start);

new TaskForm();
new TaskList();

// const item = new TaskItem('zadanie');
// item.render();
