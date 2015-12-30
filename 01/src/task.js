import {h, diff} from 'virtual-dom';
import {serialize, patch} from 'vdom-serialized-patch';
import {subscribe, publish} from './hubble';

var node1 = h();
var node2 = h('div', {style: {'font-weight': 'bold'}}, 'Ping!');
var node3 = h('div', {style: {'color': 'red'}}, 'Pong!');

subscribe('foo', data => {
  console.log('yo!', data);
});

subscribe('update', data => {
  if (data % 2 === 0)
    postPatch(node2, node3);
  else
    postPatch(node3, node2);
});

const postPatch = (n1, n2) => {
  const patch = diff(n1, n2);
  const serializedPatch = serialize(patch);
  publish('patch', serializedPatch);
}

postPatch(node1, node2);

publish('super', 123);
