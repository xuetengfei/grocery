function Person(name) {
  this.name = name;
}
Person.prototype.MyValue = 666;
Person.prototype.getName = function () {
  return this.name;
};

console.log(Person === Person.prototype.constructor); // true
Person;
var a = new Person('sven');
console.log(a.name); // sven
a.getName();
console.log(Person.prototype);

// Person.getName();
const mongoose = require('mongoose');
console.log(
  'mongoose instanceof mongoose.Mongoose',
  mongoose instanceof mongoose.Mongoose,
);

// console.log('mongoose:', mongoose);
// console.log('mongoose.Mongoose', mongoose.__proto__);
