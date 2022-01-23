const { log } = require('./utils');

const sum = (x, y, z) => x + y + z;

{
  const curry = (fn, need = fn.length, ...args) =>
    need <= args.length ? fn(...args) : curry.bind(null, fn, need, ...args);

  log(curry(Math.min, 4)(10)(50)(2)(4)); // 2
  log(curry(sum)(1)(2)(3)); // 6
}

/* ============================================== */

{
  const curry = fn =>
    fn.length === 0 ? fn() : (...args) => curry(fn.bind(null, ...args));

  log(curry(sum)(1)(2)(3)); // 6
}
