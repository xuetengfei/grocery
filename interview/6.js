async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
// 等价于;
async function async1() {
  console.log('async1 start');
  Promise.resolve(async2()).then(() => {
    console.log('async1 end');
  });
}

// [第 10 题：常见异步笔试题，请写出代码的运行结果 · Issue #7 · Advanced-Frontend/Daily-Interview-Question](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/7)
