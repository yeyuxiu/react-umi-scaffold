/*
 * @Author: yeyuxiu
 * @Date: 2025-05-01 09:17:10
 * @LastEditors: yeyuxiu
 * @LastEditTime: 2025-05-03 11:04:13
 * @Description:
 */
import {
  DesktopOutlined,
  MoonOutlined,
  SunOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Dropdown, Layout } from 'antd';
import React, { useEffect } from 'react';
import { connect, useModel } from 'umi';
//import classnames from 'classnames';
//import moment from 'moment';

const { Header } = Layout;

interface IProps {
  login?: any;
  dispatch: any;
}

const HeaderCom: React.FC<IProps> = (props) => {
  //useImperativeHandle(ref, () => ({
  //lyFormRef
  //}));

  const { dispatch } = props;
  const { themeType, changeThemeValue } = useModel('theme', (model: any) => ({
    themeType: model.themeType,
    changeThemeValue: model.changeThemeValue,
  }));
  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();

  useEffect(() => {}, []);

  const userItems: MenuProps['items'] = [
    {
      key: '1',
      label: '个人信息',
    },
    {
      key: '2',
      label: (
        <a
          onClick={() => {
            // TODO 触发models的退出登陆
            dispatch &&
              dispatch({
                type: 'login/logout',
              });
          }}
        >
          退出登陆
        </a>
      ),
    },
  ];

  const themeItems: MenuProps['items'] = [
    {
      key: 'light',
      label: '亮色主题',
    },
    {
      key: 'dark',
      label: '黑暗主题',
    },
    {
      key: 'sysAuto',
      label: '跟随系统',
    },
  ];

  // 主题色菜单
  const menuThemeChange = ({ item, key }) => {
    console.log('item', item);
    changeThemeValue(key);
  };

  return (
    <Header className="bg-white dark:bg-gray-800 px-4 flex justify-between ">
      {/* 左菜单 */}
      <div></div>
      {/* 右头像 + 主题色切换 */}
      <div className="flex">
        <div className="cursor-pointer">
          <Dropdown
            menu={{
              items: themeItems,
              selectedKeys: [themeType],
              onSelect: menuThemeChange,
              onClick: menuThemeChange,
              theme: 'dark',
            }}
            trigger={['hover']}
          >
            {/* <Tooltip
              title={
                themeType === 'light'
                  ? '亮色主题'
                  : themeType === 'dark'
                  ? '暗色主题'
                  : '跟随系统'
              }
            > */}
            {themeType === 'light' ? (
              <SunOutlined />
            ) : themeType === 'dark' ? (
              <MoonOutlined />
            ) : (
              <DesktopOutlined />
            )}
            {/* </Tooltip> */}
          </Dropdown>
        </div>
        <div className="ml-2">
          <Dropdown menu={{ items: userItems, theme: 'dark' }}>
            <Avatar size="large" icon={<UserOutlined />} />
          </Dropdown>
        </div>
      </div>
    </Header>
  );
};
//forwardRef(ComName);
// export default HeaderCom;
export default connect(({ login }) => ({
  login,
}))(HeaderCom);
