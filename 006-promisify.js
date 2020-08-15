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

const promisify = func => (...args) =>
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
  (async () => {
    const res = await fsp.readFile('./1.md', 'utf-8');
    console.log('res: ', res); // res:  just for test
  })();
}

{
  const promisify = func => (...args) =>
    new Promise((resolve, reject) =>
      func(...args, (err, result) => (err ? reject(err) : resolve(result))),
    );

  const delay = promisify((d, cb) => setTimeout(cb, d));
  delay(2000).then(() => console.log('Hi!')); //  Promise resolves after 2s
}
