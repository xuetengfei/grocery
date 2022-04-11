function _instanceOf(left) {
  let ans = [];
  let proto = Object.getPrototypeOf(left);
  while (true) {
    if (proto === null) {
      ans.push(null);
      return ans;
    }
    ans.push(proto.constructor.name);
    proto = Object.getPrototypeOf(proto);
  }
}

function Person(name) {
  this.name = name;
}
const person1 = new Person('abc');

console.log(JSON.stringify(_instanceOf(person1)));
console.log(JSON.stringify(_instanceOf([])));
console.log(JSON.stringify(_instanceOf(function () {})));
console.log(JSON.stringify(_instanceOf(new Date())));
