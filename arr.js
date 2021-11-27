const _ = require('lodash');

class SuperArray extends Array {
  constructor(...args) {
    super(...args);
  }
  diff(comparisonArray) {
    var values = [];
    var hash = {};
    for (var i of comparisonArray) {
      hash[i] = true;
    }
    for (var i of this) {
      if (!hash[i]) {
        values.push(i);
      }
    }
    return values;
  }
}
const SArray = new SuperArray('a', 'b');
console.log(SArray); // SuperArray [ 'a', 'b' ]
console.log(SArray.diff(['a', 'd'])); // [ 'b' ]

Object.assign(Number.prototype, {
  *[Symbol.iterator](a) {
    for (let i = this; i--; ) yield this - i;
  },
});
console.log([...10]); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

Array(10)
  .fill(null)
  .map((v, i) => i + 1);

{
  let Pricestrategy = new Map();
  Pricestrategy.set('return70', function ({ price }) {
    return parseInt(price / 100) * 70;
  });
  Pricestrategy.set('return10', function ({ price }) {
    return parseInt(price / 100) * 10;
  });
  Pricestrategy.set('return20', function ({ price }) {
    return parseInt(price / 100) * 20;
  });

  const fn = (algorithm, ...args) => {
    return Pricestrategy.get(algorithm)
      ? Pricestrategy.get(algorithm)(args[0])
      : '没有找到可以策略';
  };

  console.log(fn('return700', { price: 100 })); // 210
}

{
  class ChainNode {
    constructor(main, next, options) {
      this.main = main;
      this.next = next;
      this.options = options;
    }
    start() {
      let res = this.main(...arguments);
      res && this.next.start(...arguments);
    }
    setNext(callback) {
      this.next = callback;
    }
  }

  class ResponsibilityChain {
    constructor() {
      this.chainNodes = {}; // 责任节点
    }
    getChainNodes(chainName) {
      // 获取责任节点
      return this.chainNodes[chainName];
    }
    setChainNodes(name, chainNode) {
      // 设置责任节点
      this.chainNodes[name] = chainNode;
    }
    insertChainNode() {}
    chainConstitute(array) {
      // 链
      for (let index = 0; index < array.length; index++) {
        let element = this.chainNodes[array[index]];
        let next = this.chainNodes[array[index + 1]];
        element.next = next;
      }
    }
  }
}
function order500(orderType, pay, stock) {
  if (orderType === 1 && pay === true) {
    console.log('500元定金预购，得到100元优惠券');
  } else {
    return 'nextSuccessor';
  }
}

function order200(orderType, pay, stock) {
  if (orderType === 2 && pay === true) {
    console.log('200元定金预购，得到50元优惠券');
  } else {
    return 'nextSuccessor';
  }
}

function orderNormal(orderType, pay, stock) {
  if (stock > 0) {
    console.log('普通用户购买，无优惠券');
  } else {
    console.log('手机库存不足');
  }
}
{
  Function.prototype.after = function (fn) {
    const self = this;
    return function () {
      const res = self.apply(this, arguments);
      if (res === 'nextSuccessor') {
        return fn.apply(this, arguments);
      }
      return res;
    };
  };

  const order = order500.after(order200).after(orderNormal);
  order(1, true, 500); // 500元定金预购，得到100元优惠券
  order(2, true, 500); // 200元定金预购，得到50元优惠券
  order(3, true, 500); // 普通用户购买，无优惠券
  order(1, false, 0); // 手机库存不足
}

{
  var saves = ['profile', 'settings'];

  var done = _.after(saves.length, function () {
    console.log('done saving!');
  });

  _.forEach(saves, function (type) {
    asyncSave({ type: type, complete: done });
  });
  // => Logs 'done saving!' after the two async saves have completed.
}
