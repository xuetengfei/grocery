/* 请实现一个函数用来找出字符流中第一个只出现一次的字符。
例如，当从字符流中只读出前两个字符"go"时，第一个只出现一次的字符是"g"。 
当从该字符流中读出前六个字符“google"时，第一个只出现一次的字符是"l"。


# */

function fn(str) {
  const array = [...str];
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    const L = array.indexOf(element);
    const R = array.lastIndexOf(element);
    console.log('R', R);
    if (L === R) {
      return element;
    }
  }
}
const r = fn('goxoeglle');
console.log(r);
