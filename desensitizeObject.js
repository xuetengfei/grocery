const _ = require('lodash');
const util = require('util');
/* 
这句代码是 `desensitizeObject` 函数中的一部分，用于查找符合条件的脱敏规则。

首先，获取脱敏规则对象的属性名数组 `keys`，其中每个属性名都是一个字符串，表示一个脱敏规则的键。

然后，通过 `Array.prototype.find()` 方法查找第一个符合条件的脱敏规则。`find()` 方法接受一个回调函数作为参数，该回调函数会在数组中的每个元素上执行，直到找到符合条件的元素，或者遍历完整个数组。

回调函数的参数 `pattern` 表示当前元素（即当前脱敏规则的键）。在回调函数中，调用 `getRegex(pattern)` 方法获取与该脱敏规则键对应的正则表达式对象，然后调用 `test(key)` 方法测试当前属性名 `key` 是否符合该正则表达式。

如果当前属性名符合该脱敏规则的键，`getRegex(pattern).test(key)` 将返回 `true`，表示找到了对应的脱敏规则。此时，将当前属性值 `value` 传给该脱敏规则对应的函数进行处理，处理结果将保存在 `result` 对象中，键名与原始对象相同。

如果遍历完整个数组仍然没有找到符合条件的脱敏规则，则 `find()` 方法返回 `undefined`，表示没有找到对应的规则。

因此，该代码的作用是根据脱敏规则对象和当前属性名，查找符合条件的脱敏规则，以便对属性值进行脱敏处理。
 */

function desensitizeObject(obj, rules) {
  // 如果 obj 不是对象或者为 null，则直接返回 obj
  if (!obj || typeof obj !== 'object') {
    return obj;
  }
  // 如果 obj 是数组，则对数组中的每个元素递归调用 desensitizeObject() 函数
  if (Array.isArray(obj)) {
    return obj.map(item => desensitizeObject(item, rules));
  }

  // 创建一个空对象，用于存储脱敏后的数据
  // const result = {};

  // 获取脱敏规则对象的属性名数组，并缓存起来
  const keys = Object.keys(rules);

  // 创建一个缓存正则表达式对象的对象
  const regexCache = {};

  // 返回一个正则表达式对象，如果已经缓存，则直接返回缓存的对象
  function getRegex(pattern) {
    if (!regexCache[pattern]) {
      regexCache[pattern] = new RegExp(`^${pattern.replace('*', '.*')}$`);
    }
    return regexCache[pattern];
  }

  // 递归遍历对象，对对象中的属性进行脱敏处理
  function desensitize(obj) {
    // 创建一个空数组或空对象，用于存储脱敏后的数据
    const result = Array.isArray(obj) ? [] : {};

    // 遍历对象中的每个属性
    for (const key in obj) {
      // 判断当前属性是否是对象自身的属性，而不是从原型链继承的属性
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];

        const rule = keys.find(pattern => getRegex(pattern).test(key));

        // 如果找到了对应的脱敏规则，则使用规则函数对属性值进行脱敏
        if (rule) {
          result[key] = rules[rule](value);
        }
        // 如果属性值是一个对象，则递归调用 desensitizeObject() 函数对该对象进行处理
        else if (typeof value === 'object') {
          result[key] = desensitize(value);
        }
        // 如果属性值不是对象，则直接复制原始属性值
        else {
          result[key] = value;
        }
      }
    }

    // 返回脱敏后的数据
    return result;
  }

  // 对 obj 进行脱敏处理，并返回处理后的数据
  return desensitize(obj);
}
const data = [
  {
    name: '张三',
    idCard: '330122199001011234',
    phone: '13812345678',
    address: {
      province: 'true浙江省',
      city: '杭州市',
      district: '西湖区',
      street: '文三路',
      zip: '310000',
      contacts: {
        email: 'truealice@example.com',
        phone: 'true1234567890',
        friends: [],
      },
    },
    passwords: {
      login: 'true123456',
      pay: 'true654321',
    },
    friends: [
      {
        contacts: {
          email: 'truealice@example.com',
          phone: 'true1234567890',
          friends: [],
        },
      },
      {
        contacts: {
          email: 'truealice@example.com',
          phone: 'true1234567890',
          friends: [],
        },
      },
      {
        contacts: {
          email: 'truealice@example.com',
          phone: 'true1234567890',
          friends: [],
        },
      },
      {
        contacts: {
          email: 'truealice@example.com',
          phone: 'true1234567890',
          friends: [],
        },
      },
      {
        contacts: {
          email: 'truealice@example.com',
          phone: 'true1234567890',
          friends: [],
          token: 'token bear',
        },
      },
    ],
  },
];

const rules = {
  '*Card': value => value.replace(/^(\d{6})\d+(\d{4})$/, '$1********$2'),
  '*phone': value => value.replace(/^(\d{3})\d+(\d{4})$/, '$1****$2'),
  '*password': () => 'TMSJ',
  '*province': () => 'TMSJ',
  '*email': () => 'TMSJ',
  '*login': () => 'TMSJ',
  '*pay': () => 'TMSJ',
  '*phone': () => 'TMSJ',
  '*token': () => 'TMSJ',
};

const objCopy = _.cloneDeep(data);
const desensitizedData = desensitizeObject(objCopy, rules);

console.log(util.inspect(desensitizedData, { depth: null, colors: true }));
