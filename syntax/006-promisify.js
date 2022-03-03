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
