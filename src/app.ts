/*
 * @Author: yeyuxiu
 * @Date: 2025-04-21 20:50:59
 * @LastEditors: yeyuxiu
 * @LastEditTime: 2025-05-15 10:05:12
 * @Description: 运行时配置
 */
import { requestConfig } from '@/utils/request';
import type { RequestConfig } from 'umi';
import '../tailwind.css';

export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

// const ConfigLocale = props => {
//   return <ConfigProvider locale={zhCN}>{props.children}</ConfigProvider>;
// };
// export function rootContainer(container) {
//   return React.createElement(ConfigLocale, null, container);
// }

// export const layout = () => {
//   return {
//     logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
//     menu: {
//       locale: false,
//     },
//   };
// };

// export default {
//   dva: {
//     immer: true,
//     extraModels: [],
//   },
// };

export const request: RequestConfig = requestConfig;
