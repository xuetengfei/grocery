{
  const fn = function () {
    let sum = 0;
    return function () {
      sum++;
      console.log(sum);
    };
  };

  fn()(); // 1
  fn()(); // 1
}
{
  const fn = function () {
    let sum = 0;
    return function () {
      sum++;
      console.log(sum);
    };
  };
  fn1 = fn();
  fn1(); //1
  fn1(); //2
  fn1(); //3
  //   这种情况下，fn1一直在引用fn()，此时内存就不会被释放，就能实现值的累加。那么问题又来了，这样的函数如果太多，就会造成内存泄漏
}
