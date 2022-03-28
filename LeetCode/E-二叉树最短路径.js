// root = [5, 4,8, 11,null,13,4,7,2,null,null,null,1], targetSum = 22

var minDepth = function (root) {
  if (!root) {
    return 0;
  }
  if (!root.left) {
    return 1 + minDepth(root.right);
  }
  if (!root.right) {
    return 1 + minDepth(root.left);
  }
  return Math.min(minDepth(root.left), minDepth(root.right)) + 1;
};
const r = minDepth([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1], 22);
console.log('r ', r);
