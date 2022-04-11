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

const ans = [];

const fn = (tree, init = '') => {
  const val = init + tree.value;
  if (!tree.left && !tree.right) ans.push(val);
  tree.left && fn(tree.left, val);
  tree.right && fn(tree.right, val);
};

fn(tree);

console.log('ans', ans);
