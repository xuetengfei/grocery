function deepClone(obj, cache = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (cache.has(obj)) return cache.get(obj); // 如果出现循环引用，则返回缓存的对象，防止递归进入死循环
  let cloneObj = new obj.constructor(); // 使用对象所属的构造函数创建一个新对象
  cache.set(obj, cloneObj); // 缓存对象，用于循环引用的情况
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], cache); // 递归拷贝
    }
  }
  return cloneObj;
}

// 测试
const obj = { name: 'Jack', address: { x: 100, y: 200 } };
obj.a = obj; // 循环引用
const newObj = deepClone(obj);
console.log(newObj.address === obj.address); // false
