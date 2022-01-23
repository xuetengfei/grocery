/*

[格雷码 - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/%E6%A0%BC%E9%9B%B7%E7%A0%81)

十进制　格雷码 二进制
0  　　 000    000
1  　　 001    001
2   　　011    010
3   　　010    011
4   　　110    100
5   　　111    101
6   　　101    110
7   　　100    111

*/

const R = Array(10)
  .fill(1)
  .map((v, idx) => `十进制(${idx}) -> 二进制(${parseInt(idx).toString(2)})`);

console.log(R);
