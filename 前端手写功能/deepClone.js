function deepCopy(obj) {
  const res = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      res[key] = deepCopy(obj[key]);
    } else {
      res[key] = obj[key];
    }
  }
  return res;
}
var obj = {
  a: 1,
  b: 2,
  c: [1, 2, 3],
  d: { aa: 1, bb: 2 },
};
obj.e = obj;
console.log('obj', obj); // 不会报错

const objCopy = deepCopy(obj);
console.log(objCopy); // Uncaught RangeError: Maximum call stack size exceeded

const getType =
  v === 'undefined' ? 'undefined' : v === 'null' ? 'null' : v.constructor.name;

// 测试
const obj = { name: 'Jack', address: { x: 100, y: 200 } };
obj.a = obj; // 循环引用
const newObj = deepClone(obj);
console.log(newObj.address === obj.address); // false

{
  function isObject(obj) {
    return (
      (typeof obj === 'object' || typeof obj === 'function') && obj !== null
    );
  }
  function cloneDeep(source, hash = new WeakMap()) {
    if (!isObject(source)) return source;
    if (hash.has(source)) return hash.get(source); // 新增代码，查哈希表
    var target = Array.isArray(source) ? [] : {};
    hash.set(source, target); // 新增代码，哈希表设值
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        if (isObject(source[key])) {
          target[key] = cloneDeep(source[key], hash); // 新增代码，传入哈希表
        } else {
          target[key] = source[key];
        }
      }
    }
    return target;
  }
}
