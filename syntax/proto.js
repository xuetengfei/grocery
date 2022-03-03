const { divider, log } = require('./utils');

{
  let user = {
    access: true,
    isAdmin: false,
    isGuest: false,
  };
  let admin = {
    isAdmin: true,
  };
  let guest = {
    isGuest: true,
  };

  admin.__proto__ = user; // 设置 admin的Prototype = user
  guest.__proto__ = user; // 设置 admin的Prototype = user

  console.log(admin.access); // true
  console.log(admin.isAdmin); // true
  console.log(admin.isGuest); // false

  console.log(guest.access); // true
  console.log(guest.isAdmin); // false
  console.log(guest.isGuest); // true
}

divider();
{
  let user = {
    access: true,
    buy() {
      console.log('buy something');
    },
  };
  let admin = {
    isAdmin: true,
  };
  admin.__proto__ = user; // 设置 admin的Prototype = user

  admin.buy(); // buy something
}
divider();
{
  let user = {
    access: true,
    buy() {
      console.log('buy something');
    },
  };
  let admin = {
    isAdmin: true,
  };

  let superAdmin = {
    isSuperAdmin: true,
  };

  admin.__proto__ = user; // 设置 admin的Prototype = user
  superAdmin.__proto__ = admin; // 设置 admin的Prototype = user

  console.log(superAdmin.access); // true
  console.log(superAdmin.isAdmin); // true
  console.log(superAdmin.isSuperAdmin); // true

  // superAdmin 的 buy 方法是从user中获得的
  superAdmin.buy(); // buy something
}
divider();
{
  let user = {
    access: true,
    name: 'John',
    surname: 'Smith',
    set fullName(value) {
      [this.name, this.surname] = value.split(' ');
    },
    get fullName() {
      return `${this.name} ${this.surname}`;
    },
  };

  let admin = {
    __proto__: user,
    isAdmin: true,
  };

  console.log(admin.fullName); // John Smith
  // setter triggers!
  admin.fullName = 'Alice Cooper';
  console.log(admin.fullName); // Alice Cooper，admin 的内容被修改了
  console.log(user.fullName); // John Smith，user 的内容被保护了
}
divider();
{
  let user = {
    access: true,
    buy() {
      console.log('buy something');
    },
    logout() {
      this.access = false;
    },
  };
  let admin = {
    isAdmin: true,
  };
  admin.__proto__ = user; // 设置 admin的Prototype = user
  admin.logout();

  console.log(user.access); // true
  console.log(admin.access); // false
}
divider();

{
  let user = {
    access: true,
    buy() {
      console.log('buy something');
    },
    logout() {
      this.access = false;
    },
  };
  let admin = {
    isAdmin: true,
    __proto__: user,
  };

  console.log(admin.__proto__ === user); // true
  console.log(user.__proto__ === Object.prototype); // true
  console.log(Object.prototype.__proto__ === null); // true

  //
  //
  //
  console.log(Object.getPrototypeOf(admin) === user); // true
  console.log(Object.getPrototypeOf(user)); // {}
  console.log(Object.prototype); // {}
}
divider();
{
  let a = {};
  let b = function () {};
  console.log(a.prototype); // undefined
  console.log(b.prototype); // { constructor: function(){...} }
}

divider();
{
  function func() {}

  console.log(func.prototype);
  console.log(typeof func.prototype); // object

  /* 

{
    constructor: ƒ func(),
    __proto__: {
        constructor: ƒ Object(),
        hasOwnProperty: ƒ hasOwnProperty(),
        isPrototypeOf: ƒ isPrototypeOf(),
        propertyIsEnumerable: ƒ propertyIsEnumerable(),
        toLocaleString: ƒ toLocaleString(),
        toString: ƒ toString(),
        valueOf: ƒ valueOf()
    }
}

*/
  // func.prototype 就是个 对象
}

{
  const obj_a = { a: '1' };
  const obj_b = { b: '2' };
  Object.setPrototypeOf(obj_b, obj_a);
  // or   obj_b.__proto__ = obj_a;
  console.log(obj_b.a); // 1
}
divider();

{
  let user = {
    access: true,
    isAdmin: false,
    isGuest: false,
  };
  let admin = {
    isAdmin: true,
  };
  // let guest = {
  //   isGuest: true,
  // };
  admin.__proto__ = user; // 设置 admin 的 Prototype = user

  // 设置 guest 的 Prototype = user
  let guest = Object.create(user, {
    isGuest: {
      value: true,
    },
  });
  //  替换旧语法 guest.__proto__ = user;

  // 现在,从 admin 中读取一个它没有的属性 access，JavaScript 会自动从 user 中获取。
  console.log(admin.access); // true
  console.log(admin.isAdmin); // true
  console.log(admin.isGuest); // false

  console.log(guest.access); // true
  console.log(guest.isAdmin); // false
  console.log(guest.isGuest); // true
}

divider();
{
  // 给 PowerArray 新增了一个方法（可以增加更多）
  class PowerArray extends Array {
    isEmpty() {
      return this.length === 0;
    }
  }

  let arr = new PowerArray(1, 2, 5, 10, 50);
  console.log(arr.isEmpty()); // false
  console.log(arr.__proto__ === PowerArray.prototype); // true
  console.log(PowerArray.prototype.__proto__ === Array.prototype); // true
  console.log(Array.prototype.__proto__ === Object.prototype); // true
  console.log(Object.prototype.__proto__ === null); // true

  let filteredArr = arr.filter(item => item >= 10);
  console.log(filteredArr); // 10, 50
  console.log(typeof filteredArr); // 10, 50
  console.log(filteredArr.isEmpty()); // false
}
