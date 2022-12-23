import '../main.scss';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

import { TaskItem } from './components/TaskItem';

const start = 'Starting...';
console.log('🚀 ~ file: index.ts:2 ~ start', start);

const item = new TaskItem('zadanie');
item.render();
