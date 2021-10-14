import _ from 'lodash';

const o = {
  a: 1,
};
// ExperimentalWarning: The ESM module loader is experimental.
console.log('res', _.get(o, 'a', 0));
