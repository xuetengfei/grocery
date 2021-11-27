const os = require('os');
const path = require('path');
const { log } = require('../utils');

log(os.cpus());
log(os.cpus().length);
log(os.userInfo());

// console.log('path', path);
