/*
 * @Author: yeyuxiu
 * @Date: 2025-04-30 21:29:40
 * @LastEditors: yeyuxiu
 * @LastEditTime: 2025-05-03 11:03:53
 * @Description: 菜单布局
 */

import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
//import classnames from 'classnames';
import { history, useAppData, useModel } from 'umi';
//import moment from 'moment';

type MenuItem = Required<MenuProps>['items'][number];

const MenuCom: React.FC = () => {
  //useImperativeHandle(ref, () => ({
  //lyFormRef
  //}));
  //const {} = props
  const { themeType } = useModel('theme', (model: any) => ({
    themeType: model.themeType,
  }));
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const { clientRoutes } = useAppData(); // 全局路由

  useEffect(() => {
    setMenuList(initMenu());
  }, []);

  /**
   * @description: 处理路由格式+权限控制
   * @return
   */
  const initMenu = (): MenuItem[] => {
    const targetRouter = clientRoutes.find(
      (item: any) => item._id === 'baseRouter',
    );
    const processRoutes = (routes: any[]): MenuItem[] => {
      const menuItems: MenuItem[] = [];

      routes.forEach((route) => {
        if (route.name) {
          menuItems.push({
            key: route.path,
            icon: route.icon,
            label: route.name,
            children: route.routes ? processRoutes(route.routes) : undefined,
          });
        } else if (route.routes) {
          const children = processRoutes(route.routes);
          if (children.length > 0) {
            menuItems.push({
              key: route.path,
              icon: route.icon,
              label: route.name,
              children: children,
            });
          }
        }
      });

      return menuItems;
    };
    const result = processRoutes(targetRouter?.routes || []);
    if (result.length > 0) {
      setSelectedKeys([result[0].key]);
    }
    return targetRouter && targetRouter.routes ? result : [];
  };

  const onClick = ({ item, key }) => {
    console.log('item', item);
    setSelectedKeys([key]);
    history.push(key);
  };

  return (
    <Menu
      theme={themeType}
      selectedKeys={selectedKeys}
      onClick={onClick}
      mode="inline"
      items={menuList}
    />
  );
};
//forwardRef(ComName);
export default MenuCom;
//export default connect(({ test }) => ({
//...test
//}))(ComName);
