function deepClone(initalObj, finalObj) {
  var obj = finalObj || {};
  for (var i in initalObj) {
    var prop = initalObj[i]; // 避免相互引用对象导致死循环，如initalObj.a = initalObj的情况
    if (prop === obj) {
      continue;
    }
    if (typeof prop === 'object') {
      obj[i] = prop.constructor === Array ? [] : {};
      arguments.callee(prop, obj[i]);
    } else {
      obj[i] = prop;
    }
  }
  return obj;
}
var str = {};
var obj = { a: { a: 'hello', b: 21 } };
deepClone(obj, str);
console.log(str);
