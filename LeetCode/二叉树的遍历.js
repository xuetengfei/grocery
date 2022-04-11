/* 
遍历二叉树(Traversing Binary Tree)：是指按指定的规律对二叉树中的每个结点访问一次且仅访问一次。
二叉树有深度遍历和广度遍历， 深度遍历有前序、 中序和后序三种遍历方法。
二叉树的前序遍历可以用来显示目录结构等；
中序遍历可以实现表达式树，在编译器底层很有用；后序遍历可以用来实现计算目录内的文件及其信息等。
二叉树是非常重要的数据结构， 其中二叉树的遍历要使用到栈和队列还有递归等，
很多其它数据结构也都是基于二叉树的基础演变而来的。
熟练使用二叉树在很多时候可以提升程序的运行效率，减少代码量，使程序更易读。
*/

var tree = {
  value: '-',
  left: {
    value: '+',
    left: {
      value: 'a',
    },
    right: {
      value: '*',
      left: {
        value: 'b',
      },
      right: {
        value: 'c',
      },
    },
  },
  right: {
    value: '/',
    left: {
      value: 'd',
    },
    right: {
      value: 'e',
    },
  },
};

{
  // 深度优先遍历-递归
  // 它总是优先往深处访问 先序遍历
  // Depth-First Search，DFS
  let dfs = function (node, ans = []) {
    if (node) {
      ans.push(node.value);
      dfs(node.left, ans);
      dfs(node.right, ans);
    }
    return ans;
  };
  console.log('result1', dfs(tree));
  // ["-", "+", "a", "*", "b", "c", "/", "d", "e"]

  {
    let result = [];
    let dfs = function (node) {
      if (node) {
        result.push(node.value);
        dfs(node.left);
        dfs(node.right);
      }
    };
  }
}

{
  // 深度优先遍历-非递归遍历
  // 利用栈：将遍历到的结点都依次存入栈中，拿结果时从栈中访问
  const dfs = node => {
    const stack = [];
    const result = [];
    stack.push(node);
    while (stack.length) {
      const cur = stack.pop();
      result.push(cur.value);
      cur.left && stack.push(cur.left);
      cur.right && stack.push(cur.right);
    }
    return result;
  };

  const result = dfs(tree);
  console.log('result2', result);
}

{
  // 广度优先遍历-层序遍历
  // 广度优先遍历二叉树(层序遍历)是用队列来实现的，
  // 广度遍历是从二叉树的根结点开始，自上而下逐层遍历；
  // 在同一层中，按照从左到右的顺序对结点逐一访问。

  // 递归遍历
  const result = [];
  let count = 0;
  const list = [tree];

  const bfs = () => {
    let cur = list[count];
    if (cur) {
      result.push(cur.value);
      cur.left && list.push(cur.left);
      cur.right && list.push(cur.right);
      count++;
      bfs();
    }
  };
  bfs();

  console.log('result3', result);
}
{
  // 广度优先遍历-非递归算法
  function bfs(node) {
    let result = [];
    let queue = [];
    queue.push(node);
    while (queue.length) {
      node = queue.shift();
      result.push(node.value);
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
    return result;
  }
  console.log('result4', bfs(tree));
}
