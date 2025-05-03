/*
 * @Author: yeyuxiu
 * @Date: 2025-05-02 22:46:31
 * @LastEditors: yeyuxiu
 * @LastEditTime: 2025-05-02 23:32:29
 * @Description: 主题数据流
 */
import { useCallback, useEffect, useState } from 'react';

export default function Page() {
  const [themeType, setThemeType] = useState<'light' | 'dark' | 'sysAuto'>(
    'light',
  );

  // 初始化
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if(theme){
        changeThemeValue(theme as 'light' | 'dark' |'sysAuto');
    } else {
        changeThemeValue('light');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', themeType);
  }, [themeType]);

  // 监听系统变化
  const _listener = (e:any) => {
    _changeTheme(e.matches === 'dark' ? 'dark' : 'light');
  };

  // 切换主题值
  const changeThemeValue = useCallback(
    (type: 'light' | 'dark' | 'sysAuto') => {
      setThemeType(type);
      if (type === 'sysAuto') {
        window
          .matchMedia('(prefers-color-scheme: dark)')
          .addEventListener('change', _listener);
      } else {
        _changeTheme(type)
        window
          .matchMedia('(prefers-color-scheme: dark)')
          .removeEventListener('change', _listener);
      }

    },
    [themeType],
  );

  // 切换主题后要做的事情
  const _changeTheme = useCallback(
    (type: 'light' | 'dark') => {
      const html = document.documentElement;
      if (type === 'dark') {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    },
    [themeType],
  );

  return { themeType, changeThemeValue };
}
