const arr = [
  { id: 1, pid: 0, name: '中国' },
  { id: 2, pid: 1, name: '广州' },
  { id: 3, pid: 1, name: '湖北' },
  { id: 4, pid: 3, name: '武汉' },
  { id: 5, pid: 2, name: '深圳' },
  { id: 6, pid: 2, name: '东莞' },
];

const nest = (items, id = 0, link = 'pid') =>
  items
    .filter(item => item[link] === id)
    .map(item => ({ ...item, children: nest(items, item.id) }));
