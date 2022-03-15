/* 
输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
输出：6
解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。

输入：nums = [5,4,-1,7,8]
输出：23
作者：LeetCode-Solution
链接：https://leetcode-cn.com/problems/maximum-subarray/solution/zui-da-zi-xu-he-by-leetcode-solution/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

*/
const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];

{
  var maxSubArray = function (nums) {
    let pre = 0,
      maxAns = nums[0];
    const temp = [];
    nums.forEach(x => {
      pre = Math.max(pre + x, x);
      maxAns = Math.max(maxAns, pre);
      temp.push(pre);
      // console.log('pre', pre);
      // console.log('maxAns', maxAns);
    });
    console.log('temp', temp);
    return maxAns;
  };

  //   const r = maxSubArray(nums);
  //   console.log('r', r);
}
{
  function fn(arr) {
    const temp = [];
    for (let i = 0; i < arr.length; i++) {
      const subArray = arr.slice(i, arr.length - i);
      if (subArray.length) {
        temp.push(subArray);
      }
    }
    return temp;
  }
  var maxSubArray = function (array) {
    const temp = [];
    for (let index = 0; index < array.length; index++) {
      const subArray = array.slice(index, array.length);
      if (fn(subArray).length) {
        temp.push(...fn(subArray));
      }
    }
    let MAX = 0;
    let record = null;
    for (let index = 0; index < temp.length; index++) {
      const element = temp[index];
      const curSum = element.reduce((acc, cur) => acc + cur, 0);
      if (curSum > MAX) {
        record = element;
        MAX = curSum;
      }
    }
    console.log('MAX', MAX);
    console.log('record', record);
  };
  const r = maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
  console.log('r', r);
}
