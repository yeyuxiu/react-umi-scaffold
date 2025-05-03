/*
 * @Author: yeyuxiu
 * @Date: 2025-04-22 12:53:06
 * @LastEditors: yeyuxiu
 * @LastEditTime: 2025-05-03 10:40:14
 * @Description: 路由
 */
export default [
  {
    name: '登录',
    path: '/login',
    component: './Login',
    menuRender: false,
    menuHeaderRender: false,
    hideInMenu: true,
    hideInBreadcrumb: true,
  },
  {
    path: '/',
    component: '../layouts/BaseLayout',
    _id: 'baseRouter', // menu组件会根据这个特别标识将下面的路由放到组件里
    routes: [
      {
        path: '/',
        redirect: './home',
      },
      {
        name: '首页',
        path: '/home',
        component: './Home',
      },
    ],
  },
  {
    path: '*',
    component: '../layouts/BaseLayout',
    routes: [
      {
        path: '*',
        component: './404',
      },
    ],
  },
];
