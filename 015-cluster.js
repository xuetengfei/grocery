/* Node cluster  */

const cluster = require('cluster');
const cupCount = require('os').cpus().length; // 8

if (cluster.isMaster) {
  for (let i = 0; i < cupCount; i++) {
    cluster.fork();
  }
  cluster.on('exit', function () {
    cluster.fork();
  });
} else {
  require('./01501');
}
