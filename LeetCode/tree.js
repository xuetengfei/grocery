let Arr = [
  {
    id: '1',
    menu_name: '设置',
    menu_url: 'setting',
    parent_id: 0,
  },
  {
    id: '1-1',
    menu_name: '权限设置',
    menu_url: 'setting.permission',
    parent_id: '1',
  },
  {
    id: '1-1-1',
    menu_name: '用户管理列表',
    menu_url: 'setting.permission.user_list',
    parent_id: '1-1',
  },
  {
    id: '1-1-2',
    menu_name: '用户管理新增',
    menu_url: 'setting.permission.user_add',
    parent_id: '1-1',
  },
  {
    id: '1-1-3',
    menu_name: '角色管理列表',
    menu_url: 'setting.permission.role_list',
    parent_id: '1-1',
  },
  {
    id: '1-2',
    menu_name: '菜单设置',
    menu_url: 'setting.menu',
    parent_id: '1',
  },
  {
    id: '1-2-1',
    menu_name: '菜单列表',
    menu_url: 'setting.menu.menu_list',
    parent_id: '1-2',
  },
  {
    id: '1-2-2',
    menu_name: '菜单添加',
    menu_url: 'setting.menu.menu_add',
    parent_id: '1-2',
  },
  {
    id: '2',
    menu_name: '订单',
    menu_url: 'order',
    parent_id: 0,
  },
  {
    id: '2-1',
    menu_name: '报单审核',
    menu_url: 'order.orderreview',
    parent_id: '2',
  },
  {
    id: '2-2',
    menu_name: '退款管理',
    menu_url: 'order.refundmanagement',
    parent_id: '2',
  },
];

//将id做为对象的键名，整个对象做为键值 来生成新的数组
let treeList = Arr.reduce((prev, cur) => {
  prev[cur['id']] = cur;
  return prev;
}, {});
console.log(treeList);
