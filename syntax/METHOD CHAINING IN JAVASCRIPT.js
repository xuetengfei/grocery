// [Method Chaining in JavaScript](https://x-team.com/blog/javascript-method-chaining/)

{
  const food = [
    { name: 'Banana', type: 'fruit' },
    { name: 'Apple', type: 'fruit' },
    { name: 'Chocolate', type: 'candy' },
    { name: 'Orange', type: 'fruit' },
  ];

  // This type of usage is very common
  food
    .map(item => item.type)
    .reduce((result, fruit) => {
      result.push(fruit);
      return [...new Set(result)];
    }, []);
  // result: ['fruit', 'candy']
}
{
  const dog = {
    is: null,
    log: () => console.log(this.is),
    bark() {
      this.is = 'woofing';
      this.log();
      return this;
    },
    walk() {
      this.is = 'walking';
      this.log();
      return this;
    },
    eat() {
      this.is = 'eating';
      this.log();
      return this;
    },
  };

  dog.bark().eat().walk();
}
{
  class Dog {
    is = null;
    log() {
      console.log(this.is);
    }
    bark() {
      this.is = 'woofing';
      this.log();
      return this;
    }
    walk() {
      this.is = 'walking';
      this.log();
      return this;
    }
    eat() {
      this.is = 'eating';
      this.log();
      return this;
    }
  }
  const dog = new Dog();
  dog.bark().eat().walk();
}
{
  function Dog() {}
  Dog.prototype.is = null;
  Dog.prototype.log = function () {
    console.log(this.is);
  };
  Dog.prototype.bark = function () {
    this.is = 'woofing';
    this.log();
    return this;
  };
  Dog.prototype.walk = function () {
    this.is = 'walking';
    this.log();
    return this;
  };
  Dog.prototype.eat = function () {
    this.is = 'eating';
    this.log();
    return this;
  };
  const dog = new Dog();
  dog.bark().eat().walk();
}
{
  const requests = {
    user: null,
    action: null,
    log(something) {
      console.log(this[something]);
    },
    async getUser() {
      this.user = await new Promise(resolve => {
        setTimeout(() => {
          resolve('Douglas Pires');
        }, 1000);
      });
      this.log('user');
      return this;
    },
    async registerAction() {
      this.action = await new Promise(resolve => {
        setTimeout(() => {
          resolve('programming stuff');
        }, 1000);
      });
      this.log('action');
      return this;
    },
  };

  requests.getUser().then(() => requests.registerAction());
}
