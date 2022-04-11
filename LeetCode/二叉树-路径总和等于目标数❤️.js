/* 
给你二叉树的根节点 root 和一个表示目标和的整数 targetSum 。判断该树中是否存在 根节点到叶子节点 的路径，这条路径上所有节点值相加等于目标和 targetSum 。如果存在，返回 true ；否则，返回 false 。

叶子节点 是指没有子节点的节点。

输入：root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
输出：true
解释：等于目标和的根节点到叶节点路径如上图所示。

*/

const tree = {
  val: 4,
  left: {
    val: 9,
    left: { val: 5 },
    right: { val: 1 },
  },
  right: {
    val: 0,
  },
};

// 解题思路：

// 只需要遍历整棵树

// 如果当前节点不是叶子节点，递归它的所有子节点，传递的参数就是 sum 减去当前的节点值；
// 如果当前节点是叶子节点，判断参数 sum 是否等于当前节点值，如果相等就返回 true，否则返回 false。

// 作者：user7746o
// 链接：https://leetcode-cn.com/problems/path-sum/solution/javascript-lu-jing-zong-he-by-user7746o/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

var hasPathSum = function (root, sum) {
  // 根节点为空
  if (!root) return false;
  // 叶节点 判断参数 sum 是否等于当前节点值，如果相等就返回 true，否则返回 false。
  if (!root.left && !root.right) return root.val === sum;
  // 总和减去当前值，并递归
  console.log('sum1', sum);
  sum = sum - root.val;
  console.log('sum2', sum);
  return hasPathSum(root.left, sum) || hasPathSum(root.right, sum);
};

const r = hasPathSum(tree, 14);
console.log('r ', r);
