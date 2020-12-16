/* 
    [Reflect - ECMAScript 6入门](https://es6.ruanyifeng.com/#docs/reflect)
    从Reflect对象上可以拿到语言内部的方法
Reflect.apply(target, thisArg, args)
Reflect.construct(target, args)
Reflect.get(target, name, receiver)
Reflect.set(target, name, value, receiver)
Reflect.defineProperty(target, name, desc)
Reflect.deleteProperty(target, name)
Reflect.has(target, name)
Reflect.ownKeys(target)
Reflect.isExtensible(target)
Reflect.preventExtensions(target)
Reflect.getOwnPropertyDescriptor(target, name)
Reflect.getPrototypeOf(target)
Reflect.setPrototypeOf(target, prototype)
*/

{
  const o = { weather: 'sun' };

  console.log('weather' in o);

  console.log(Reflect.has(Object, 'assign'));
}

{
  const o = { weather: 'sun' };
  var loggedObj = new Proxy(o, {
    get(target, name) {
      console.log('get', target, name);
      return Reflect.get(target, name);
    },
    deleteProperty(target, name) {
      console.log('delete' + name);
      return Reflect.deleteProperty(target, name);
    },
    has(target, name) {
      console.log('has' + name);
      return Reflect.has(target, name);
    },
  });

  loggedObj.weather;
}
