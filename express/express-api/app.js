const fs = require('fs');
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const developmentErrorhandler = require('errorhandler');
// const csurf = require('csurf');
// const session = require('express-session');
require('dotenv').config();

const app = express();
const dog = require('./control/dog');
const { debugInfo, debugHIT } = require('./utils/debug');
const {
  affixionRequestTime,
  logErrors,
  clientErrorHandler,
  errorHandler,
  validateCookies,
} = require('./appMiddleware');

/* 使用中间件 */
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'log/access.log'),
  {
    flags: 'a',
    encoding: 'utf8',
  },
);
app.use(bodyParser.json());
app.use(morgan('combined', { stream: accessLogStream })); // logger
app.use(cookieParser()); // 解析cookie
app.use(methodOverride());
app.use(affixionRequestTime);
app.use(validateCookies);

/* 路由处理程序 */
app.use('/dog', dog);

app.get('/test', function (req, res) {
  res.send({
    requestTime: req.requestTime,
  });
});

app.get('/broken', function (req, res) {
  throw new Error('BROKEN'); // Express will catch this on its own.
});

app.get('/broken2', function (req, res, next) {
  fs.readFile('/file-does-not-exist', function (err, data) {
    if (err) {
      next(err); // Pass errors to Express.
    } else {
      res.send(data);
    }
  });
});

app.get('*', function (req, res) {
  debugHIT('hit:*');
  res.status(404).json({ message: '404' });
});

// app.get('*', function (req, res, next) {
//   console.log('hit:*');
//   res.status(301).redirect('/not-found');
// });

// app.get('*', function (err, req, res, next) {
// const error = new Error();
// error.statusCode = 301;
// error.reson = `${req.ip} tried to access ${req.originalUrl}`;
// next(err);
// });

app.use(logErrors);
app.use(clientErrorHandler);
if (process.env.NODE_ENV === 'development') {
  app.use(developmentErrorhandler());
} else {
  app.use(errorHandler);
}

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DATABASE,
});

// connection.connect();
// connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
//   if (err) throw err;
//   console.log('The solution is: ', rows[0].solution);
// });

// connection.end();

const server = app.listen(4444, function () {
  debugInfo('start in 4444');
});

process.on('SIGTERM', () => {
  debug('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    debug('HTTP server closed');
  });
});
