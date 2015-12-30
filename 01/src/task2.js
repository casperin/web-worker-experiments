import {subscribe, publish} from './hubble';

subscribe('super', data => {
  console.log('received at task2', data);
});
