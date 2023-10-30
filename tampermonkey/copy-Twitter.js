// ==UserScript==
// @name         下载推文按钮v1
// @namespace    http://your.namespace.com
// @version      1.0
// @description  在页面上添加下载按钮
// @author       Your Name
// @match        https://twitter.com/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  // 获取当前日期和时间
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

  function getMarkdownContent(tag, justImage) {
    const ans = [];
    const articles = document.querySelectorAll('article');
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
    const url = '[推文地址](' + window.location.href + ')';
    const userId =
      '#' +
      document
        .querySelector('article div[dir="ltr"] span span')
        .textContent.replace(/\s+/g, '');
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

  const addButton = ({ name, tag, left = '10px', top, justImage = false }) => {
    const downloadButton = document.createElement('button');
    downloadButton.textContent = name;
    downloadButton.style.position = 'fixed';
    downloadButton.style.zIndex = '9999';
    downloadButton.style.top = top;
    downloadButton.style.left = left;
    document.body.appendChild(downloadButton);
    downloadButton.addEventListener('click', function () {
      const { markdownContent, first14Characters } = getMarkdownContent(
        tag,
        justImage,
      );
      const fileContent = new Blob([markdownContent], {
        type: 'text/markdown',
      });
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(fileContent);
      downloadLink.download = first14Characters + '.md';
      downloadLink.click();
    });
  };

  setTimeout(() => {
    addButton({
      name: '下载文件',
      tag: '',
      top: '10px',
    }),
      addButton({
        name: '下载网晃',
        tag: '网晃-wh',
        top: '40px',
        justImage: true,
      });
  }, 1000);
})();
