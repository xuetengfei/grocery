const { divider, log } = require('./utils');

{
  let user = {
    name: 'John',
    id: 1,
  };
  let id = Symbol('id');
  user[id] = 2;

  console.log('user.id', user.id); //  1
  console.log('user[id]', user[id]); // 2
}

{
  log(parseInt('100px')); // 100
  log(parseFloat('12.5em')); // 12.5
  log(parseInt('12.3')); // 12，只有整数部分被返回了
  log(parseFloat('12.3.4')); // 12.3，在第二个点出停止了读取
  log(parseInt('a123')); //NaN
}

{
  {
    let john = { name: 'John' };
    let map = new Map();
    map.set(john, 'apple');
    john = null; // 覆盖引用
    console.log(map.keys()); // undefined
    console.log(map.get({ name: 'John' })); // undefined
  }
}

{
  let john = { name: 'John' };

  let weakMap = new WeakMap();
  weakMap.set(john, '...');

  john = null; // 覆盖引用

  // john 被从内存中删除了！
  console.log(weakMap.has(john)); // false
}

{
  let cache = new WeakMap();

  // 计算并记结果
  function process(obj) {
    if (!cache.has(obj)) {
      let result = 123;
      cache.set(obj, result);
    }
    return cache.get(obj);
  }

  let obj = {
    a: 'A',
  };

  let result1 = process(obj);
  let result2 = process(obj);
  console.log('result1', result1);
  console.log('result2', result2);

  console.log(cache.get(obj));
  obj = null; // ……稍后，我们不再需要这个对象时：
  console.log(cache.has(obj)); // false
  // weakMap.get(key)
  // weakMap.set(key, value)
  // weakMap.delete(key)
  // weakMap.has(key)
}

{
  function f() {
    let value = 123;

    return function () {
      alert(value);
    };
  }

  let g = f(); // g.[[Environment]]
}

{
  function mul(a, b) {
    return a * b;
  }

  let double = mul.bind(null, 2);

  console.log(double(3)); // = mul(2, 3) = 6
  console.log(double(4)); // = mul(2, 4) = 8
  console.log(double(5)); // = mul(2, 5) = 10
}

{
  function partial(func, ...argsBound) {
    return function (...args) {
      return func.call(this, ...argsBound, ...args);
    };
  }
  const sum = (a, b, c) => a + b + c;
  const fivePlus = partial(sum, 2, 3);

  console.log('fivePlus(4)', fivePlus(4));
  fivePlus(5); // 10
  fivePlus(6); // 11
}

{
  let group = {
    title: 'Our Group',
    students: ['John', 'Pete', 'Alice'],

    showList() {
      this.students.forEach(function (student) {
        // Error: Cannot read property 'title' of undefined
        log(this.title + ': ' + student);
      });
    },
  };

  group.showList();
}
