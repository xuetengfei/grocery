/* 
GET http://localhost:4444/dog/type/123
*/

exports.fn1 = function fn(req, res, next) {
  console.log('ID:', req.params.id);
  console.log('middleware:fn1 was hitted ');
  next();
};

exports.cb0 = function (req, res, next) {
  console.log('CB0');
  next();
};

exports.cb1 = function (req, res, next) {
  console.log('CB1');
  next();
};

exports.cb2 = function (req, res) {
  res.status(200).json({
    success: 'ok',
    data: { name: 'happy', msg: 'Hello from C!' },
  });
};
