const { log } = require('./utils');

{
  // add(2)(3) implementation in JS.
  function add(x) {
    return function (y) {
      return x + y;
    };
  }
  log('add(2)(3)', add(2)(3));
  {
    const add = x => y => x + y;
    log('add(2)(3)', add(2)(3));
  }
}

{
  // add(2)(3) via valueOf
  function add(x) {
    let sum = x;
    function resultFn(y) {
      sum += y;
      return resultFn;
    }
    resultFn.valueOf = function () {
      return sum;
    };
    return resultFn;
  }
  log('add(2)(3) via valueOf', add(2)(3).valueOf());
}

{
  // add(2)(3) via explicit property
  function add(x) {
    let sum = x;
    return function resultFn(y) {
      sum += y;
      resultFn.result = sum;
      return resultFn;
    };
  }

  log('add(2)(3) via explicit property', add(3)(4)(5));
  log('add(2)(3) via explicit property result', add(3)(4)(5).result);
}

{
  // add(2)(3) via explicit argumentless call
  function add(x) {
    let sum = x;
    return function resultFn(y) {
      if (arguments.length) {
        // not relying on falsy value
        sum += y;
        return resultFn;
      }
      return sum;
    };
  }
  log('explicit argumentless call', add(2)(3)());
  log('explicit argumentless call', add(2)(3)(4));
  log('explicit argumentless call', add(2)(3)(4)());
}

{
  // add(2)(3)(4) with add(2,3,4)
  function add() {
    let args = [].slice.apply(arguments);
    function resultFn() {
      args = args.concat([].slice.apply(arguments));

      if (args.length >= 3) {
        return args.slice(0, 3).reduce(function (acc, next) {
          return acc + next;
        }, 0);
      }
      return resultFn;
    }
    return resultFn();
  }

  log(add(2)(3)(4));
  log(add(2, 3, 4));
  log(add(2)(3, 4));
  log(add(2, 3)(4));
}

// https://theanubhav.com/2019/02/03/js-currying-in-interview
