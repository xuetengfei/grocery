const express = require('express');
const cluster = require('cluster');
const os = require('os');

const app = express();
const pid = process.pid;
const numCPUs = os.cpus().length;

app.get('/', function (_req, res) {
  res.json({ success: true, pid });
});

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; ++i) {
    cluster.fork();
  }
} else {
  app.listen(3200, () => {
    console.log(`is running on 3200,pid is ${pid}`);
  });
}
