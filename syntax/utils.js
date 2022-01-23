const divider = () => console.log('-'.repeat(20) + 'logger' + '-'.repeat(20));

const log = (desc, what) => {
  divider();
  what ? console.log(`${desc} is:`, what) : console.log(desc);
};
module.exports = {
  divider,
  log,
};
