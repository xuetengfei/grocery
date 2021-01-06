const { divider, log } = require('./utils');

// In JavaScript, the JSON.stringify() function looks for functions named toJSON in the object being serialized.
// If an object has a toJSON function, JSON.stringify() calls toJSON()
// and serializes the return value from toJSON() instead.

const O = {
  a: '1',
  toJSON: () => 10,
};
log(JSON.stringify(O)); // 10
