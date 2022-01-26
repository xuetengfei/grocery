const debug = require('debug');

const debugInfo = debug('INFO');
const debugHIT = debug('HIT');
const debugDogMiddleware = debug('Dog Middleware');
const debugAPPMiddleware = debug('APP Middleware');
const debugERROR = debug('error');

module.exports = {
  debugInfo,
  debugHIT,
  debugDogMiddleware,
  debugAPPMiddleware,
  debugERROR,
};
