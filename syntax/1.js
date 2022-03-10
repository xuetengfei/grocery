const { divider, log } = require('./utils');

{
  const o = [
    {
      key: 'name',
      value: 'apple',
    },
    {
      key: 'age',
      value: 1,
    },
    {
      key: 'from',
      value: '数据平台',
    },
  ];

  const fn = arr =>
    arr.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {});

  console.log(fn(o));
}
divider();
{
  function filterArr(arr) {
    // 这里写下你的代码
    return arr.filter(v => {
      return arr.filter((v, idx) => arr.indexOf(v) == idx);
    });
  }
  // [ 2, 3, 4, 1, 1 ]
  console.log(filterArr([1, 2, 3, 4, 2, 3, 4, 1, 5, 6, 23, 32, 1]));
}

{
  (function () {
    const a = (b = 1);
    // 这里我理解相当于
    // b = 1,const a = b
  })();

  console.log(typeof a); // undefined
  console.log(typeof b); // number
}
{
  const Boy = {
    Motherland: 'China',
    Nation: 'Han',
    Profile: {
      Gender: 'Male',
      Age: 25,
      Education: {
        a: 1,
        b: 2,
      },
    },
  };
  const x = { ...Boy };
  Boy.x = 1;
  Boy.Profile.Gender = 'feMale';
  Boy.Profile.Education.a = 10;
  console.log('Boy', Boy);
  console.log('x', x);
}
{
  var A = function () {};
  A.prototype.n = 1;
  var b = new A();
  A.prototype = {
    n: 2,
    m: 3,
  };
  var c = new A();

  console.log(b.n); // 1
  console.log(b.m); // undefined

  console.log(c.n); // 2
  console.log(c.m); // 3
}
{
  var F = function () {};

  Object.prototype.a = function () {
    console.log('a');
  };

  Function.prototype.b = function () {
    console.log('b');
  };

  var f = new F();

  f.a(); // a
  // f.b(); // error

  F.a(); // a
  F.b(); // b
}
divider();
{
  function F() {
    this.a = 1;
    this.b = () => {
      console.log(this.a);
    };
  }
  F.prototype = {
    a: 1,
    b: () => {
      console.log(this.a);
    },
  };
  const fn = new F();
  console.log('fn.__proto__', fn.__proto__);
  fn.b.call(null);
}
{
  const addTwoNumbers = function (l1, l2) {
    const n1 = l1.reduce((acc, cur, idx) => {
      return acc + Math.pow(10, idx) * cur;
    }, 0);
    const n2 = l2.reduce((acc, cur, idx) => {
      return acc + Math.pow(10, idx) * cur;
    }, 0);
    return [...(n1 + n2 + '')].reverse().map(v => Number(v));
  };
  console.log(addTwoNumbers([9, 9, 9, 9, 9, 9, 9], [9, 9, 9, 9])); // [8,9,9,9,0,0,0,1]
  console.log(addTwoNumbers([2, 4, 3], [5, 6, 4])); // [7,0,8]
}

// 输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
// 输出：[8,9,9,9,0,0,0,1]

// 输入：l1 = [2,4,3], l2 = [5,6,4]
// 输出：[7,0,8]
// 解释：342 + 465 = 807.

divider();
{
  console.log(!![] == true); // true
  console.log([] == false); // true
}
divider();
{
  const cache = {
    John: ['55', '99'],
  };
  const handler = {
    get: function (target, key) {
      if (target[key]) {
        return target[key];
      }
      console.log('do fetch');
      return null;
    },
  };
  const cached = new Proxy(cache, handler);
  console.log('proxy cached', cached);
  console.log(cached.John);
}
{
  function throttle(fn, ms) {
    let falg = true;
    return function () {
      if (!falg) {
        return;
      }
      flag = false;
      setTimeout(() => {
        fn.apply(this, arguments);
        flag = true;
      }, ms);
    };
  }
  function deBounce(fn, interval) {
    let timer = null;
    return function () {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn.apply(this, arguments);
      }, interval);
    };
  }

  function debounce(fn, ms) {
    let timer = null;
    return function () {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn.apply(this, arguments);
      }, ms);
    };
  }
}
{
  function formatFileSize(fileSize) {
    const num = 1024;
    const B = Math.pow(num, 1);
    const KB = Math.pow(num, 2);
    const GB = Math.pow(num, 3);

    if (fileSize < B) {
      return fileSize + 'B';
    }
    if (fileSize < KB) {
      return (fileSize / B).toFixed(2) + 'KB';
    }
    if (fileSize < GB) {
      return (fileSize / KB).toFixed(2) + 'MB';
    }
    return (fileSize / GB).toFixed(2) + 'GB';
  }
  console.log(formatFileSize(1023)); // 1023B
  console.log(formatFileSize(1024)); // 1.00KB
  console.log(formatFileSize(112233445566)); // "104.53GB"
}

divider();
{
  function sumFloat(a, b) {
    const MIN = Math.min(a, b).toString();
    const SIZE = MIN.slice(MIN.indexOf('.') + 1).length;
    const ZOOMIN = Math.pow(10, SIZE);
    return (a * ZOOMIN + b * ZOOMIN) / ZOOMIN;
  }
  console.log(sumFloat(0.1, 0.2)); // 0.3
  console.log(0.1 + 0.2); // 0.30000000000000004
}
divider();
function Person(name) {
  this.name = name;
}

function newFn(FN, ...args) {
  // 1.链接到原型
  // or obj.__proto__ = FN.prototype;
  const obj = Object.create(FN.prototype);
  // 2.绑定 this，执行构造函数。构造函数执行 return 一个对象
  const ret = FN.apply(obj, args);
  return typeof ret === 'object' ? ret : obj;
}

const person = newFn(Person, 'xtf');

console.log(person);
console.log(person instanceof Person); // true

function myNew(f, ...args) {
  const o = Object.create(f.prototype);
  const r = f.apply(o, args);
  return typeof r === 'object' ? r : o;
}
