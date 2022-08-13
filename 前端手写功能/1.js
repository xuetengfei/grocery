// Here You can type your custom JavaScript...
oppo = 'oppo';

window.JSBridge = {
  // 调用 Native
  invoke: function (bridgeName, data) {
    // 判断环境，获取不同的 nativeBridge
    if (bridgeName === 'test' && data) {
      console.log('bridgeName', data);
    }
  },
};

window.addEventListener('DOMContentLoaded', function () {
  console.log('DOMContentLoaded');
  console.log(oppo);
});

window.JSBridge.invoke('test', { a: 1, b: 2 });

// window.onload = function () {
//   const imgs = document.getElementsByTagName('img');
//   Array.from(imgs).forEach(v => {
//     if (v.dataset.src) {
//       v.setAttribute('src', v.dataset.src);
//     }
//   });
// };
