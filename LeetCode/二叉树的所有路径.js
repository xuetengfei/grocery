var tree = {
  value: '1',
  left: {
    value: '2',
    left: {
      value: '4',
    },
    right: {
      value: '5',
    },
  },
  right: {
    value: '3',
    left: {
      value: '6',
    },
  },
};

function find(tree) {
  const ans = [];
  const fn = (tree, init = '') => {
    const val = init + tree.value + '->';
    if (!tree.left && !tree.right) ans.push(val);
    tree.left && fn(tree.left, val);
    tree.right && fn(tree.right, val);
  };
  fn(tree);
  return ans.map(v => v.slice(0, -2));
}

console.log('find(tree)', find(tree));
