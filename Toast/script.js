import Toast from './Toast.js';

const x = new Toast({ position: 'left', text: 'toast content' });

setTimeout(function () {
  x.remove();
}, 10000);
