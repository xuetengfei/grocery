// let a = { x: 1 };
// let b = a;
// a.x = a = { n: 1 };
// console.log(a); // { n: 1 }
// console.log(b); // { x: { n: 1 } }

const name = '南玖';
const person = {
  name: 'nanjiu',
  say: function () {
    console.log('say:', this.name);
  },
  say2: () => {
    console.log('say2:', this.name);
  },
};
person.say(); // say: nanjiu
person.say2(); // say2: undefined

{
  const target = {
    key1: 1,
    key2: undefined,
    key3: [2, 4, 8],
    key4: {
      child: 'child',
    },
    key5: function () {
      console.log('this key5 func');
    },
    null: 'x',
  };
  target.target = target;

  /* 
  console.log(target.target);

  <ref *1> {
  key1: 1,
  key2: undefined,
  key3: [ 2, 4, 8 ],
  key4: { child: 'child' },
  key5: [Function: key5],
  null: 'x',
  target: [Circular *1]
  }
  */

  function clone(target, map = new Map()) {
    if (typeof target === 'object') {
      let cloneTarget = Array.isArray(target) ? [] : {};
      if (map.get(target)) {
        return map.get(target);
      }
      map.set(target, cloneTarget);
      for (const key in target) {
        cloneTarget[key] = clone(target[key], map);
      }
      return cloneTarget;
    } else {
      return target;
    }
  }

  // 解决循环引用导致的栈溢出问题，就需要我们判断要拷贝的对象，是不是已经拷贝过，而不要循环拷贝。
  // 递归 + 类型判断 + 遍历赋值
  // 浅拷贝实现上就没有递归类型判断这一层了）

  // if (typeof target === 'object') {
  // let cloneTarget =

  function deepClone(target, map = new Map()) {
    // typeof操作符 数组、null 都是 'object'
    // Object只能用基本类型作为key值,不存在null数据类型的情况
    if (typeof target === 'object') {
      let cloneTarget = Array.isArray(target) ? [] : {};
      // 解决循环引用问题，可以额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，
      // 当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象，
      // 如果有的话直接返回，如果没有的话继续拷贝，这样就巧妙化解的循环引用的问题。
      if (map.get(target)) {
        return map.get(target);
      }
      map.set(target, cloneTarget);
      for (const key in target) {
        cloneTarget[key] = deepClone(target[key], map);
      }
      return cloneTarget;
    } else {
      return target;
    }
  }
  const ans = deepClone(target);

  console.log(ans);
  /* 
  <ref *1> {
    key1: 1,
    key2: undefined,
    key3: [ 2, 4, 8 ],
    key4: { child: 'child' },
    key5: [Function: key5],
    null: 'x',
    target: [Circular *1]
  }
  */

  // for (const key in ans) {
  //   console.log(typeof key);
  // }
  // ans.key5();
}
// [如何写出一个惊艳面试官的深拷贝? - 掘金](https://juejin.cn/post/6844903929705136141#heading-5)
// [【每日一题】深拷贝时有循环引用怎么解决？-技术圈](https://jishuin.proginn.com/p/763bfbd65bed)
