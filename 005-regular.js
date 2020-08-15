const { divider, log } = require('./utils');

const str =
  '549e07ZdbzxMiciZgAiZgAiZgAiZgAhYRMwARMwARMwASaloAFT9MurSdmAiZgAiZRMwARMoGk';

{
  log(str.match(/.{1,10}/g));
  divider();
}
