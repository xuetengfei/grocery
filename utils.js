const log = (desc, what) => {
  what ? console.log(`${desc} is:`, what) : console.log(desc);
};
const divider = () => console.log('====================');

module.exports = {
  divider,
  log,
};
