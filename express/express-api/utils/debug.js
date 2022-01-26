const debug = require('debug');

exports.debugInfo = debug('INFO');
exports.debugHIT = debug('HIT');
exports.debugDogMiddleware = debug('Dog Middleware');
exports.debugAPPMiddleware = debug('APP Middleware');
exports.debugERROR = debug('error');
