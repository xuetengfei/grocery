const { divider, log } = require('./utils');

{
  // `delay`毫秒后执行resolve
  const delay = timeout =>
    new Promise(resolve => setTimeout(() => resolve(timeout), timeout));

  const tasks = [delay(1), Promise.reject('abc'), delay(64), delay(128)];

  console.time('TEST');
  // 所有promise变为resolve后程序退出
  Promise.all(tasks)
    .then(values => {
      console.timeEnd('TEST');
      console.log(values);
    })
    .catch(err => console.log('err', err)); // abc
}
return;
divider();
{
  class BinarySearchTree {
    constructor() {
      this.root = null; // 根节点
    }
    _createNode(key) {
      const init = Object.create(null);
      init.key = key;
      init.left = null;
      init.right = null;
      return init;
    }
    insert(key) {
      const newNode = this._createNode(key);
      if (this.root === null) {
        // 如果此时没有root 就把当前插入的node 作为root
        this.root = newNode;
      } else {
        // 否则根据 key值往下比较 左小 右大
        this.insertNode(this.root, newNode);
      }
    }
    insertNode(node, newNode) {
      // 插入比较规则
      if (newNode.key < node.key) {
        if (node.left === null) {
          node.left = newNode;
          return;
        }
        this.insertNode(node.left, newNode);
      } else {
        if (node.right === null) {
          node.right = newNode;
          return;
        }
        this.insertNode(node.right, newNode);
      }
    }
    // 搜索最小值
    min() {
      return this.minNode(this.root);
    }
    minNode(node) {
      if (node) {
        while (node && node.left !== null) {
          node = node.left;
        }
        return node.key;
      }
      return null;
    }
    // 搜索最大值
    max() {
      return this.maxNode(this.root);
    }
    maxNode(node) {
      if (node) {
        while (node && node.right !== null) {
          node = node.right;
        }
        return node.key;
      }
      return null;
    }
    // 搜索特定值
    search(key) {
      return this.searchNode(this.root, key); // 从根节点开始查找
    }
  }

  let nodes = [8, 3, 10, 1, 6, 11, 2, 9, 12];
  let tree = new BinarySearchTree();
  nodes.forEach(key => tree.insert(key));
  console.log('tree', JSON.stringify(tree, null, 2));
}
{
}
divider();
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
