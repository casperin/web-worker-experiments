import {h, diff} from 'virtual-dom';
import createElement from 'virtual-dom/create-element';
import {serialize, patch} from 'vdom-serialized-patch';
import {addWorker, subscribe, publish} from './hubble';

addWorker('js/task.js');
addWorker('js/task2.js');

subscribe('bar', data => {
  console.log('from worker!', data);
});


const container = document.querySelector('#container');
const button = document.querySelector('#btn');

subscribe('patch', data => {
  patch(container, data)
});

let counter = 0;
button.addEventListener('click', _ => {
  publish('update', counter++);
}, false);

