// ==UserScript==
// @name         Twitter 可视区域文章高亮
// @namespace    http://your.namespace.com
// @version      1.0
// @description  进入可视区域的推文高亮显示
// @author       Your Name
// @match        https://twitter.com/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要+1并补零
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const fileName = `${year}-${month}-${day}_${hours}-${minutes}-${seconds}.md`;

  function f() {
    return true;
  }

  function getMarkdownContent(tag, justImage, dom) {
    console.log('dom:', dom);
    const ans = [];
    const articles = dom ? [dom] : document.querySelectorAll('article');
    let url = null;
    let userId = null;
    if (dom) {
      userId = '#' + dom.querySelectorAll('a')[1].text;
      url = '[推文地址](' + dom.querySelectorAll('a')[3].href + ')';
    } else {
      url = '[推文地址](' + window.location.href + ')';
      userId =
        '#' +
        document
          .querySelector('article div[dir="ltr"] span span')
          .textContent.replace(/\s+/g, '');
    }

    for (let i = 0; i < articles.length; i++) {
      const tweetTexts = articles[i].querySelectorAll(
        'div[data-testid="tweetText"]',
      );
      const text = [...tweetTexts]
        .map(v =>
          [...v.querySelectorAll('span')]
            .map(v => v.textContent)
            .filter(f)
            .reduce((a, c) => a + c, ''),
        )
        .join('\n');
      if (!justImage) {
        ans.push('\n' + text);
      }
      const articleImages = [...articles[i].querySelectorAll('img')]
        .map(img => {
          const s = img.getAttribute('src');
          const isSvg = s.endsWith('.svg');
          const hasFormat = s.includes('format');
          const hasName = s.includes('name');
          if (!isSvg && hasFormat && hasName) {
            return `![Image](${s})`;
          }
        })
        .filter(Boolean)
        .join('\n');
      ans.push('\n' + articleImages);
    }
    const timestamp = new Date().toLocaleDateString();
    let articleContent = ans.join('');
    const first14Characters = articleContent.substring(0, 30);
    const tagSection = tag ? `\n#${tag}` : ''; // 使用条件运算符添加标签部分
    const markdownContent = `${userId}
${timestamp}
${tagSection}
#twitter${url}
${articleContent}`; // 使用模板字符串构建内容
    return {
      markdownContent,
      first14Characters,
    };
  }

  function downloadAsMarkdownFile({ tag, justImage, dom }) {
    const { markdownContent, first14Characters } = getMarkdownContent(
      tag,
      justImage,
      dom,
    );
    const fileContent = new Blob([markdownContent], {
      type: 'text/markdown',
    });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(fileContent);
    downloadLink.download = first14Characters + '.md';
    downloadLink.click();
  }

  function modifyVisibleArticle(dom) {
    if (!dom.querySelector('.custom-button')) {
      const button = document.createElement('button');
      button.className = 'custom-button';
      button.textContent = '下载';
      button.style.position = 'absolute';
      // button.style.right = '25%';
      // button.style.bottom = '60px';
      button.style.top = '60px';
      button.style.left = '0px';
      button.style.border = '0';
      button.style.background = 'transparent';
      dom.appendChild(button);
      // 添加按钮点击事件处理
      button.addEventListener('click', function () {
        // 处理按钮点击事件
        downloadAsMarkdownFile({
          justImage: false,
          dom,
        });
      });
    }
    if (!dom.querySelector('.custom-button2')) {
      const button = document.createElement('button');
      button.className = 'custom-button2';
      button.textContent = '网晃';
      button.style.position = 'absolute';
      button.style.top = '90px';
      button.style.left = '0px';
      button.style.border = '0';
      button.style.background = 'transparent';
      dom.appendChild(button);
      // 添加按钮点击事件处理
      button.addEventListener('click', function () {
        // 处理按钮点击事件
        downloadAsMarkdownFile({
          tag: '网晃-wh',
          justImage: true,
          dom,
        });
      });
    }
  }

  function handleScroll() {
    const articles = document.querySelectorAll('article');
    articles.forEach(function (article) {
      const rect = article.getBoundingClientRect();
      // 判断元素的任意一部分是否在可视区域内
      const isPartiallyVisible =
        rect.bottom >= 0 && rect.top <= window.innerHeight;

      if (isPartiallyVisible) {
        // 元素的任意一部分在可视区域内
        modifyVisibleArticle(article);
      } else {
        // 元素不在可视区域内
      }
    });
    requestAnimationFrame(handleScroll); // 递归调用，优化性能
  }

  // 初次调用
  handleScroll();
})();
