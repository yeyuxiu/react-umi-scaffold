/*
 * @Author: yeyuxiu
 * @Date: 2025-04-30 19:20:23
 * @LastEditors: yeyuxiu
 * @LastEditTime: 2025-05-03 10:21:02
 * @Description: 基本布局
 */

import React, { useEffect, useState } from 'react';

import { Layout } from 'antd';
import { Outlet, useModel } from 'umi';
import Breadcurmb from '../Breadcrumb';
import HeaderCom from '../Header';
import MenuCom from '../MenuLayout';
const { Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { themeType } = useModel('theme', (model: any) => ({
    themeType: model.themeType,
  }));
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {}, []);

  return (
    <Layout className="h-screen">
      <Sider
        theme={themeType}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        {/* logo */}
        <div className="text-lg text-black dark:text-white font-bold flex items-center justify-center h-[68px] ">
          {initialState.name}
        </div>
        <MenuCom />
      </Sider>
      <Layout>
        <HeaderCom />
        <Content className="px-4 dark:bg-gray-900">
          <Breadcurmb />
          <div className="p-4 h-full bg-white dark:bg-gray-800 rounded-sm">
            <Outlet />
          </div>
        </Content>
        <Footer className="text-center dark:bg-gray-800 dark:text-white">
          react18+umi4脚手架
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
