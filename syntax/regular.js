const { log } = require('./utils');

{
  const str = '12 fff 87 er334 233 -=-=fa80';
  log('res', str.match(/\d+/g));
  //  [ '12', '87', '334', '233', '80' ]
}
