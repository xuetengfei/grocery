const nums = [1, 2, 3, 2, 2, 2, 5, 4, 2];

/* 

输入：num1 = "11", num2 = "123"
输出："134"

*/
function fn(num1, num2) {
  const n = num1.length >= num2.length ? num1 : num2;
  const m = num1.length < num2.length ? num1 : num2;
  const temp = [];
  let more = 0;
  for (let i = 0; i < n.length; i++) {
    const a = n[n.length - i - 1];
    const b = m[m.length - i - 1] || 0;
    const sum = Number(a) + Number(b) + more;
    if (sum >= 10) {
      temp.unshift(sum - 10);
      more = 1;
    } else {
      more = 0;
      temp.unshift(sum);
    }
  }
  return temp.join('');
}

const r = fn('456', '77');
console.log('r', r);
