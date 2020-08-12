const { divider, log } = require('./utils');

{
  // 1
  const twice = {
    apply(target, ctx, args) {
      console.log('args: ', args);
      console.log('ctx: ', ctx);
      console.log('target: ', target);
      return Reflect.apply(...arguments) * 2;
    },
  };
  function sum(left, right) {
    return left + right;
  }
  const proxy2 = new Proxy(sum, twice);
  log(proxy2(1, 2)); // 6
  log(proxy2.call(null, 5, 6)); // 22
  log(proxy2.apply(null, [7, 8])); // 30
  divider();
}

{
  // 2
  const wrap = obj => {
    return new Proxy(obj, {
      get(target, propKey) {
        console.log(`Reading property "${propKey}"`);
        return target[propKey];
      },
    });
  };

  const object = { message: 'hello world' };
  const wrapped = wrap(object);
  console.log(wrapped.message);

  // >> Reading property "message"
  // >> hello world
}
{
  // 3
  // [Haskell-like composition in JavaScript | by Dimitri Nikogosov | DailyJS | Jul, 2020 | Medium]
  // (https://medium.com/dailyjs/haskell-like-composition-in-javascript-6142a2a82821)
  const composable = {
    get: function (target, prop) {
      if (prop in target) {
        return target[prop];
      } else {
        const entity = eval(prop);
        if (typeof entity === 'function' && typeof target === 'function') {
          return new Proxy((...args) => target(entity(...args)), composable);
        }
      }
    },
  };
  const id = new Proxy(x => x, composable);
  // It works with function declaration syntax
  function double(x) {
    return x * 2;
  }
  // It works with arrow functions
  const addThree = x => x + 3;
  const f = id.double.addThree.double;
  console.log(' f: ', f(1.5));
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
