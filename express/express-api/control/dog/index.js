const express = require('express');
const _ = require('lodash');
const dayjs = require('dayjs');
const { fn1, cb0, cb1, cb2 } = require('./middleware');
const { debugDogMiddleware } = require('../../utils/debug');

/* 
express.Router
使用express.Router该类创建模块化、可安装的路由处理程序。
实例是一个Router完整的中间件和路由系统；因此，它通常被称为“迷你应用程序”。
[快速路由](https://expressjs.com/en/guide/routing.html)
*/

const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  debugDogMiddleware('Time: ', Date.now());
  // if (!req.headers['x-auth']) return next('router');
  // 要跳过路由器的其余中间件功能，请调用next('router') 以将控制权从路由器实例传回。
  // 这里就匹配到了通配符 返回 message:404
  next();
});
// router.use(function timeLog(req, res, next) {
//   console.log('dog-cb2');
//   next();
// });

router.get('/', function (req, res, next) {
  /* 
   全局的中间件函数:函数requestTime
   给req添加一个requestTime属性
   */
  const hitTimeStamp = _.get(req, 'requestTime') || Date.now();
  const requestTime = dayjs(hitTimeStamp).format('YYYY-MM-DD HH:mm:ss');

  res.status(200).json({
    success: 'ok',
    data: { dog: 1 },
    requestTime,
    a: req.a,
  });
});

/* [cb0, cb1, cb2] 一组回调函数可以处理路由 */
const callBackStuff = [cb0, cb1, cb2];
router.get('/name', callBackStuff);

router.get('/type/:id', [fn1], function (req, res, next) {
  res.status(200).json({
    success: 'ok',
    id: req.params.id,
  });
});

router.get('/hair/:color', function (req, res, next) {
  if (req.params.color === 'special') {
    /* 调用next('route')以将控制权传递给下一个路由,相同的路由 */
    next('route');
  } else {
    // next();
    res.status(200).json({
      success: 'ok',
      color: 'normal',
    });
  }
});
router.get('/hair/:color', [], function (req, res, next) {
  res.status(200).json({
    success: 'ok',
    color: 'special',
  });
});

// router.get('/xx', [], function (req, res, next) {});

module.exports = router;
