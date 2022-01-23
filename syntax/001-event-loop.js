const { divider, log } = require('./utils');

{
  setTimeout(() => {
    log('timer1');
    Promise.resolve().then(function () {
      log('promise1');
    });
  }, 0);

  setTimeout(() => {
    log('timer2');
    Promise.resolve().then(function () {
      log('promise2');
    });
  }, 0);
}
