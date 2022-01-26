/* 
GET http://localhost:4444/dog/type/123
*/
const { debugDogMiddleware } = require('../../utils/debug');

exports.fn1 = function fn(req, res, next) {
  debugDogMiddleware('ID:', req.params.id);
  debugDogMiddleware('middleware:fn1 was hitted ');
  next();
};

exports.cb0 = function (req, res, next) {
  debugDogMiddleware('Request URL:CB0', req.originalUrl);
  next();
};

exports.cb1 = function (req, res, next) {
  debugDogMiddleware('Request Type:CB1', req.method);
  next();
};

exports.cb2 = function (req, res) {
  res.status(200).json({
    success: 'ok',
    data: { name: 'happy', msg: 'Hello from C!' },
  });
};
