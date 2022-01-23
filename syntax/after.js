const _ = require('lodash');

function fn1({ a } = { a: null }) {
  console.log('hit fn1');
  if (a === 1) {
    return { success: 'ok' };
  }
  return null;
}
function fn2({ a } = { a: null }) {
  console.log('hit fn2');
  if (a === 2) {
    return { success: 'ok' };
  }
  return null;
}
function fn3({ a } = { a: null }) {
  console.log('hit fn3');
  if (a === 3) {
    return { success: 'ok' };
  }
  return null;
}
function fn4({ a } = { a: null }) {
  console.log('hit fn4');
  if (a === 4) {
    return { success: 'ok' };
  }
  return null;
}

function save() {
  const stuff = [...arguments];
  let res = null;
  return function fn(args) {
    for (let handler of stuff) {
      console.log('handler', handler.name);
      res = handler(args);
      if (res) break;
    }
    return res;
  };
}

// const warppers = save(fn1, fn2, fn3, fn4);
// const res = warppers({ a: 2 });
// console.log('res', res);

{
  /* 
    [JavaScript Chain of Responsibility Design Pattern - Dofactory]
    (https://www.dofactory.com/javascript/design-patterns/chain-of-responsibility#)
    
    JavaScript Chain of Responsibility
The Chain of Responsibility pattern provides 
a chain of loosely coupled objects one of which can satisfy a request. 
This pattern is essentially a linear search for an object that can handle a particular request.

责任链模式提供
松散耦合的对象链，其中一个可以满足一个请求。
该模式本质上是对能够处理特定请求的对象的线性搜索。


责任链的一个例子是事件冒泡事件传播通过一系列嵌套控制其中一个可能选择来处理事件。
 　　 　　开脱责任链模式相关链接模式中经常使用JavaScript (jQuery大量使用这种模式)。
  　　 　　了解更多关于链接模式及其好处看到我们Dofactory JS的产品。


    */
  var Request = function (amount) {
    this.amount = amount;
    console.log('Requested: $' + amount + '\n');
  };

  Request.prototype = {
    get: function (bill) {
      var count = Math.floor(this.amount / bill);
      this.amount -= count * bill;
      console.log('Dispense ' + count + ' $' + bill + ' bills');
      return this;
    },
  };
  function run() {
    var request = new Request(378);
    request.get(100).get(50).get(20).get(10).get(5).get(1);
  }
  //   run();
}

{
  function fn1({ a } = { a: null }) {
    if (a === 1) {
      return { success: 'ok' };
    }
    return null;
  }
  function fn2({ a } = { a: null }) {
    if (a === 2) {
      return { success: 'ok' };
    }
    return null;
  }
  function fn3({ a } = { a: null }) {
    if (a === 3) {
      return { success: 'ok' };
    }
    return null;
  }
  function fn4({ a } = { a: null }) {
    if (a === 4) {
      return { success: 'ok' };
    }
    return null;
  }

  function ResponsibilityChain(args) {
    this.args = args;
    this.response = null;
  }
  ResponsibilityChain.prototype = {
    joint: function (fn) {
      if (!this.response) {
        const calc = fn(this.args);
        console.log(`${fn.name} res is run`);
        if (calc) {
          this.response = calc;
        }
      }
      return this;
    },
    value: function () {
      return this.response;
    },
  };

  function run() {
    var respChain = new ResponsibilityChain({ a: 3 });
    const respChainEntry = respChain
      .joint(fn1)
      .joint(fn4)
      .joint(fn3)
      .joint(fn2);
    const R = respChainEntry.value();
    console.log('R', R);
  }
  run();
}
