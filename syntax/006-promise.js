// const fetch = require('node-fetch');
const { divider, log } = require('./utils');

const api = ' http://httpbin.org/get?id=1';

divider();
{
  function add(a, b) {
    return Promise.resolve(a + b);
  }
  add(2, 3).then(res => {
    console.log(res); // 5
  });
}

divider();
{
  Promise.any([
    new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error('Whoops!')), 1000),
    ),
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
  ]).then(console.log(resolve)); // 1
}

return;
{
  class HttpError extends Error {
    constructor(response) {
      super(`${response.status} for ${response.url}`);
      this.name = 'HttpError';
      this.response = response;
    }
  }

  function loadJson(url) {
    return fetch(url).then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new HttpError(response);
      }
    });
  }

  function demoGithubUser() {
    let name = prompt('Enter a name?', 'iliakan');
    document.body.style.opacity = 0.3;
    return loadJson(`https://api.github.com/users/${name}`)
      .finally(() => {
        // 停止指示（indication）
        document.body.style.opacity = '';
        // 有一个浏览器技巧，是从 finally 返回零延时（zero-timeout）的 promise。
        // 这是因为一些浏览器（比如 Chrome）需要“一点时间”外的 promise 处理程序来绘制文档的更改。
        // 因此它确保在进入链下一步之前，指示在视觉上是停止的。
        return new Promise(resolve => setTimeout(resolve));
      })
      .then(user => {
        alert(`Full name: ${user.name}.`);
        return user;
      })
      .catch(err => {
        if (err instanceof HttpError && err.response.status == 404) {
          alert('No such user, please reenter.');
          return demoGithubUser();
        } else {
          throw err; // (*)
        }
      });
  }

  demoGithubUser();
}
