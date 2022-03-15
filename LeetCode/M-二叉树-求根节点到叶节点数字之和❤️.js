/* 
给你一个二叉树的根节点 root ，树中每个节点都存放有一个 0 到 9 之间的数字。
每条从根节点到叶节点的路径都代表一个数字：

例如，从根节点到叶节点的路径 1 -> 2 -> 3 表示数字 123 。
计算从根节点到叶节点生成的 所有数字之和 。

叶节点 是指没有子节点的节点。

输入：root = [4,9,0,5,1]
输出：1026
解释：
从根到叶子节点路径 4->9->5 代表数字 495
从根到叶子节点路径 4->9->1 代表数字 491
从根到叶子节点路径 4->0 代表数字 40
因此，数字总和 = 495 + 491 + 40 = 1026

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/sum-root-to-leaf-numbers
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
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

const dfs = (root, prevSum = 0) => {
  if (!root) return 0;
  const sum = prevSum * 10 + root.val;
  if (!root.left && !root.right) {
    return sum;
  }
  return dfs(root.left, sum) + dfs(root.right, sum);
};

const sumNumbers = root => dfs(root);

console.log('sumNumbers(tree)', sumNumbers(tree));
