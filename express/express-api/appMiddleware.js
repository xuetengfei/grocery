// 添加请求时间
exports.affixionRequestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

exports.clientErrorHandler = function (err, req, res, next) {
  console.log('clientErrorHandler');
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
};
exports.errorHandler = function (err, req, res, next) {
  console.log('errorHandler');
  res.status(500).json({ msg: 'errorHandler', err: err.reson || err });
};

exports.logErrors = function (err, req, res, next) {
  console.log('logErrors');
  next(err);
};

async function cookieValidator(cookies) {
  return 'ok';
  try {
    await externallyValidateCookie(cookies.testCookie);
  } catch {
    throw new Error('Invalid cookies');
  }
}

// 检查cookie有效性
exports.validateCookies = async function (req, res, next) {
  await cookieValidator(req.cookies);
  req.a = 1;
  next();
};
