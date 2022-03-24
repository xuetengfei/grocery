const source = { a: { b: { c: 1, d: [1, 2] } }, f: { g: 2 }, m: 22 };

const isObject = v => v.constructor.name === 'Object';

function flat(obj, key = '', res = {}, isArray = false) {
  for (let [k, v] of Object.entries(obj)) {
    if (Array.isArray(v)) {
      let tmp = isArray ? key + '[' + k + ']' : key + k;
      flat(v, tmp, res, true);
    } else if (typeof v === 'object') {
      let tmp = isArray ? key + '[' + k + '].' : key + k + '.';
      flat(v, tmp, res);
    } else {
      let tmp = isArray ? key + '[' + k + ']' : key + k;
      res[tmp] = v;
    }
  }
  return res;
}

// console.log(flat(o));

function objectFlat(obj = '') {
  const res = {};
  function flat(item, preKey = '') {
    Object.entries(item).forEach(([k, v]) => {
      let curKey = k;
      if (Array.isArray(item)) {
        curKey = preKey ? `${preKey}[${k}]` : k;
      } else {
        curKey = preKey ? `${preKey}.${k}` : k;
      }
      if (v && typeof v === 'object') {
        flat(v, curKey);
      } else {
        res[curKey] = v;
      }
    });
  }
  flat(obj);
  return res;
}

console.log(objectFlat(source));
