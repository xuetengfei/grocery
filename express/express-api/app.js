const express = require('express');
const cookieParser = require('cookie-parser');
const { cookieValidator } = require('./utils');

const app = express();
const dog = require('./control/dog');

/* 第三方的配置 */
// 解析cookie
app.use(cookieParser());

/* 使用中间件 */
// 添加请求时间
const requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

// 检查cookie有效性
async function validateCookies(req, res, next) {
  await cookieValidator(req.cookies);
  req.a = 1;
  next();
}

// middleware setting
app.use(requestTime);
app.use(validateCookies);

/* 路由处理程序 */
app.use('/dog', dog);

app.get('/test', function (req, res) {
  res.send({
    requestTime: req.requestTime,
  });
});

app.get('*', function (req, res) {
  console.log('error');
  res.status(404).json({ message: '404' });
});

app.listen(4444, function () {
  console.log('start in 4444');
});
