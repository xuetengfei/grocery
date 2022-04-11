const curry = fn => {
  let curried = (...args) => {
    if (args.length === fn.length) return fn(...args);
    return (...more) => curried(...more, ...args);
  };
  return curried;
};

const sum = (x, y, z) => x + y + z;

console.log(curry(sum)(1)(2)(3)); // 6
console.log(curry(sum)(1, 2)(3)); // 6
console.log(curry(sum)(1)(2, 3)); // 6
