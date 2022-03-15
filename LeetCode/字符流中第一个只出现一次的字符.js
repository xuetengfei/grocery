/* 请实现一个函数用来找出字符流中第一个只出现一次的字符。
例如，当从字符流中只读出前两个字符"go"时，第一个只出现一次的字符是"g"。 
当从该字符流中读出前六个字符“google"时，第一个只出现一次的字符是"l"。


# */

function fn(s) {
  const map = {};
  for (let index = 0; index < s.length; index++) {
    const i = s[index];
    if (map[i]) {
      map[i] = map[i] + 1;
    } else {
      map[i] = 1;
    }
  }
  for (const key in map) {
    const val = map[key];
    if (val == 1) {
      return key;
    }
  }
  return null;
}

const r = fn('google');
console.log(r);
