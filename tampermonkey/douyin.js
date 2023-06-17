javascript: (function () {
  var e = document.createElement('a');
  var t = new Date().getTime();
  const dom = document.querySelector('.xg-video-container')(
    (e.href =
      dom.querySelector('video').src || dom.querySelector('video').currentSrc),
  );
  (e.download = 'video_' + t + '.mp4'),
    (e.style.display = 'none'),
    (e.target = '_blank'),
    document.body.appendChild(e),
    e.click(),
    document.body.removeChild(e);
})();

// 2
javascript: (function () {
  var e = document.createElement('a'),
    t = new Date().getTime(),
    dom = document.querySelectorAll('.xg-video-container')[1] || document;
  (e.href =
    dom.querySelector('video').src || dom.querySelector('video').currentSrc),
    (e.download = 'video_' + t + '.mp4'),
    (e.style.display = 'none'),
    (e.target = '_blank'),
    document.body.appendChild(e),
    e.click(),
    document.body.removeChild(e);
  e.onload = function () {
    if (window.location.hostname.includes('douyinvod')) {
      window.close();
    }
  };
})();

javascript: (function () {
  var e = document.createElement('a'),
    t = new Date().getTime(),
    dom = document.querySelectorAll('.xg-video-container')[1] || document;
  e.href =
    dom.querySelector('video').src || dom.querySelector('video').currentSrc;
  e.download = 'video_' + t + '.mp4';
  e.style.display = 'none';
  e.target = '_blank';
  document.body.appendChild(e);
  e.click();
  document.body.removeChild(e);
})();

(function () {
  var e = document.createElement('a'),
    t = new Date().getTime(),
    dom = document.querySelectorAll('.xg-video-container')[1] || document;
  var href =
    dom.querySelector('video').src || dom.querySelector('video').currentSrc;
  e.href = href;
  console.log('e:', e);
  // e.download = 'video_' + t + '.mp4';
  // e.style.display = 'none';
  // e.target = '_blank';
  // document.body.appendChild(e);
  // e.click();
  // document.body.removeChild(e);
  // 获取 Blob URL
  // const blobUrl = video.src;

  // 发送 HTTP 请求获取 Blob 对象
  fetch(href)
    .then(response => response.blob())
    .then(blob => {
      // 创建文件对象
      const file = new File([blob], 'video.mp4', { type: blob.type });
      console.log('file:', file);
    });
})();

fetch('blob:https://www.douyin.com/186057f4-2813-4439-8f2a-1aee30ff6e63');
