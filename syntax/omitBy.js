const _ = require("lodash");

var object = { a: 1, b: "2", c: {}, d: null };

const r = _.omitBy(object, function (v) {
  if (typeof v === "object" || [null, undefined].includes(v)) {
    return true;
  }
  return false;
});
console.log("r: ", r);
