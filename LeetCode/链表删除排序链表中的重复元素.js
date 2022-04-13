const list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 2,
      next: {
        value: 3,
        next: null,
      },
    },
  },
};

const deleteDuplicates = function (head) {
  let p = head;
  while (p && p.next) {
    if (p.value === p.next.value) {
      p.next = p.next.next;
    } else {
      p = p.next;
    }
  }
  return head;
};

console.log(JSON.stringify(deleteDuplicates(list), null, 2));

// 链接：https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/solution/shan-chu-pai-xu-lian-biao-zhong-de-zhong-fu-yua-91/
// 来源：力扣（LeetCode）
