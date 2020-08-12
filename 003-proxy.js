const { divider, log } = require('./utils');

{
  // [Haskell-like composition in JavaScript | by Dimitri Nikogosov | DailyJS | Jul, 2020 | Medium](https://medium.com/dailyjs/haskell-like-composition-in-javascript-6142a2a82821)
  const composable = {
    get: function (target, prop) {
      if (prop in target) {
        return target[prop];
      } else {
        const entity = eval(prop);
        if (typeof entity === 'function' && typeof target === 'function') {
          return (...args) => target(entity(...args));
        }
      }
    },
  };
  const double = new Proxy(function (x) {
    return x * 2;
  }, composable);
  const addThree = new Proxy(x => x + 3, composable);
  const f = double.addThree.double;
  // console.log('f: ', f);
  //   const res = f(1.5);
  //   log(res);
}

{
  const fetch = ms => {
    return new Promise((resolve, _) => {
      setTimeout(() => {
        resolve(ms);
      }, ms * 1000);
    });
  };

  const handler = {
    apply: function (target, _context, args) {
      console.log('target: ', target);
      return target(...args);
    },
  };

  const Task = new Proxy(fetch, handler);

  Task(1)
    .then(res => console.log(res))
    .catch();
}

{
  function sum(a, b) {
    return a + b;
  }
  const handler = {
    apply: function (target, thisArg, argumentsList) {
      divider();
      log('thisArg: ', thisArg);
      log('target: ', target);
      log('argumentsList: ', argumentsList);
      log(`Calculate sum: ${argumentsList}`);
      divider();
      return target(argumentsList[0], argumentsList[1]) * 10;
    },
  };

  const proxy1 = new Proxy(sum, handler);
  log(sum(1, 2)); // 30
  log(proxy1(1, 2)); // 1
}
