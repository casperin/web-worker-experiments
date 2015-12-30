import {h, diff} from 'virtual-dom';
import createElement from 'virtual-dom/create-element';
import {serialize, patch} from 'vdom-serialized-patch';

const worker = new Worker('js/task.js');


const container = document.querySelector('#container');
const button = document.querySelector('#btn');

worker.addEventListener('message', e => patch(container, e.data), false);

let counter = 0;
button.addEventListener('click', _ => {
  worker.postMessage(counter++);
}, false);

