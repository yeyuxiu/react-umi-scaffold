/*
 * @Author: yeyuxiu
 * @Date: 2025-04-30 22:50:44
 * @LastEditors: yeyuxiu
 * @LastEditTime: 2025-04-30 23:15:46
 * @Description: 面包屑
 */
import { Breadcrumb } from 'antd';
import React from 'react';
//import classnames from 'classnames';
import { history, useSelectedRoutes } from 'umi';
//import moment from 'moment';

const BreadcrumbCom: React.FC = () => {
  //useImperativeHandle(ref, () => ({
  //lyFormRef
  //}));
  const routes = useSelectedRoutes(); // 当前选中的路由 + 向上回溯的路由

  return (
    <Breadcrumb
      style={{ margin: '16px 0' }}
      className="dark:text-gray-300"
      items={routes.map((item: any) => ({
        title: item.route.name,
        onClick: () => {
          history.push(item.pathname);
        },
      }))}
    ></Breadcrumb>
  );
};
//forwardRef(ComName);
export default BreadcrumbCom;
//export default connect(({ test }) => ({
//...test
//}))(ComName);
