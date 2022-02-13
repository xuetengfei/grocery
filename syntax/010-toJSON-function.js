const { divider, log } = require('./utils');

// In JavaScript, the JSON.stringify() function looks for functions named toJSON in the object being serialized.
// If an object has a toJSON function, JSON.stringify() calls toJSON()
// and serializes the return value from toJSON() instead.

const O = {
  a: '1',
  toJSON: () => 10,
};
log(JSON.stringify(O)); // 10

// 尝试直接将模型实例记录到日志console.log会产生很多混乱，
// 因为 Sequelize 实例附加了很多东西。相反，您可以使用该.toJSON()方法
// （顺便说一下，它会自动保证实例被JSON.stringify很好地编辑）。

// const jane = await User.create({ name: 'Jane' });
// console.log(jane); // Don't do this
// console.log(jane.toJSON()); // This is good!
// console.log(JSON.stringify(jane, null, 4)); // This is also good!

const function2 = () => console.trace();
const function1 = () => function2();
function1();
