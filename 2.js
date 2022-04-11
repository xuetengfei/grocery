// let a = { x: 1 };
// let b = a;
// a.x = a = { n: 1 };
// console.log(a); // { n: 1 }
// console.log(b); // { x: { n: 1 } }

const name = '南玖';
const person = {
  name: 'nanjiu',
  say: function () {
    console.log('say:', this.name);
  },
  say2: () => {
    console.log('say2:', this.name);
  },
};
person.say(); // say: nanjiu
person.say2(); // say2: undefined
