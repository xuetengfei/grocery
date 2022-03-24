{
  // 对象扁平化
}
{
  var name = 'window';

  function Person(name) {
    this.name = name;
    (this.foo1 = function () {
      console.log(this.name);
    }),
      (this.foo2 = () => console.log(this.name)),
      (this.foo3 = function () {
        return function () {
          console.log(this.name);
        };
      }),
      (this.foo4 = function () {
        return () => {
          console.log(this.name);
        };
      });
  }
  var person1 = new Person('person1');
  var person2 = new Person('person2');

  person1.foo1(); // person1
  person1.foo1.call(person2); // person2

  person1.foo2(); // person1
  person1.foo2.call(person2); // person1

  person1.foo3()(); // window
  person1.foo3.call(person2)(); // window
  person1.foo3().call(person2); // person2

  person1.foo4()(); // person1
  person1.foo4.call(person2)(); // person2
  person1.foo4().call(person2); // person1
}

const SingleTon = (() => {
  let instance;
  class CreateSingleTon {
    constructor(name) {
      if (instance) return instance;
      this.name = name;
      this.getName();
      return (instance = this);
    }

    getName() {
      return this.name;
    }
  }
  return CreateSingleTon;
})();

const a = new SingleTon('instance_A');
const b = new SingleTon('instance_B');

console.log(a.getName()); // instance_A
console.log(b.getName()); // instance_A
console.log(a === b); // true

{
  class CreateSingleTon {
    constructor(name) {
      this.name = name;
    }
    getName() {
      return this.name;
    }
  }

  function makeSingleton(func) {
    let instance,
      handler = {
        construct: function (target, args) {
          if (!instance) {
            instance = new func(...args);
          }
          return instance;
        },
      };
    return new Proxy(func, handler);
  }

  const TestSingleton = makeSingleton(CreateSingleTon);
  const c = new TestSingleton('instance_C');
  const d = new TestSingleton('instance_D');
  console.log(c.getName()); // instance_C
  console.log(d.getName()); // instance_C
  console.log(c === d); // true
}
