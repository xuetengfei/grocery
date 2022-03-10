const fs = require('fs');

// function promisify(f) {
//   return function (...args) {
//     return new Promise((resolve, reject) => {
//       function callback(err, result) {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(result);
//         }
//       }
//       args.push(callback);
//       f.call(this, ...args);
//     });
//   };
// }

const promisify =
  func =>
  (...args) =>
    new Promise((resolve, reject) =>
      func(...args, (err, result) => (err ? reject(err) : resolve(result))),
    );

/* ============================================== */

{
  let fsp = new Proxy(fs, {
    get(target, key) {
      return promisify(target[key]);
    },
  });
  // (async () => {
  //   const res = await fsp.readFile('./assets/test.md', 'utf-8');
  //   console.log('res: ', res); // res:  just for test
  // })();
}

{
  const promisify =
    func =>
    (...args) =>
      new Promise((resolve, reject) =>
        func(...args, (err, result) => (err ? reject(err) : resolve(result))),
      );

  // const delay = promisify((d, cb) => setTimeout(cb, d));
  // delay(2000).then(() => console.log('Hi!')); //  Promise resolves after 2s
}

{
  const promisify =
    func =>
    (...args) =>
      new Promise((resolve, reject) =>
        func(...args, (err, result) => (err ? reject(err) : resolve(result))),
      );

  const sum = (num1, num2, callback) => {
    console.log('callback', callback.toString());
    // callback (err, result) => (err ? reject(err) : resolve(result))
    if (!num1 || !num2) {
      return callback(new Error('Missing dependencies'), null);
    }
    const sum = num1 + num2;
    const message = `Sum is ${sum}`;
    return callback(null, { sum, message });
  };

  const sumPromisify = promisify(sum);
  sumPromisify(2, 3)
    .then(val => console.log('val', val)) // val 5
    .catch(err => console.log('err', err));
}

{
  let range = {
    from: 1,
    to: 5,
    // for..of range 在一开始就调用一次这个方法
    [Symbol.iterator]() {
      // ...它返回 iterator object：
      // 后续的操作中，for..of 将只针对这个对象，并使用 next() 向它请求下一个值
      return {
        current: this.from,
        last: this.to,
        // for..of 循环在每次迭代时都会调用 next()
        next() {
          // 它应该以对象 {done:.., value :...} 的形式返回值
          if (this.current <= this.last) {
            return { done: false, value: this.current++ };
          } else {
            return { done: true };
          }
        },
      };
    },
  };

  console.log([...range]); // [ 1, 2, 3, 4, 5 ]
}

{
  let range = {
    from: 1,
    to: 5,
    *[Symbol.iterator]() {
      // [Symbol.iterator]: function*() 的简写形式
      for (let value = this.from; value <= this.to; value++) {
        yield value;
      }
    },
  };

  console.log([...range]); // [ 1, 2, 3, 4, 5 ]
}

{
  function someAsyncTask() {
    return new Promise(function (resolve, reject) {
      reject(a);
    });
  }
  someAsyncTask().then(function () {}, console.error);
}

{
  const logger = function () {
    console.log(this.name);
  };

  const fun = logger.bind({ name: 'Order' });

  fun();
}
