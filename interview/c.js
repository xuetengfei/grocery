const curry = (fn, need = fn.length, ...args) =>
  need <= args.length ? fn(...args) : curry.bind(null, fn, need, ...args);
