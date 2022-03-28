/* 
输入一个字符串,按字典序打印出该字符串中字符的所有排列。
例如输入字符串abc,则打印出由字符a,b,c所能排列出来的所有字符串
abc,acb,bac,bca,cab和cba。
*/

function fn(s) {
  const l = s.length;
  for (let index = 0; index < l; index++) {
    const ele = s[index];
  }
  return;
}

var perm = function (s) {
  var result = [];
  if (s.length <= 1) {
    return [s];
  }
  for (let i = 0; i < s.length; i++) {
    let c = s[i]; // 递归选择每一位上面的数字
    var l = perm(s.filter(v => v !== c));
    for (let j = 0; j < l.length; j++) {
      var tmp = c + l[j]; // 把所有的排列保存到result数组中
      result.push(tmp);
    }
  }
  return result;
};
const nums = ['a', 'b', 'c', 'd'];
const r = perm(nums);
console.log('r', r);
