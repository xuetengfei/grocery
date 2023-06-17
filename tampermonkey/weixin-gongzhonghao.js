// ==UserScript==
// @name         微信公众号-反图片懒加载-xtf
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://mp.weixin.qq.com/s/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=qq.com
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  // Your code here...
  setTimeout(() => {
    // 获取所有带有"data-src"属性的图片元素
    const images = document.querySelectorAll('img[data-src]');

    // 循环遍历每个图片元素
    images.forEach(img => {
      // 将"data-src"属性的值赋值给"src"属性
      img.src = img.getAttribute('data-src');
    });
  }, 0);

  // Your code end here...
})();
