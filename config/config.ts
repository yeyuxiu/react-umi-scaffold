/*
 * @Author: yeyuxiu
 * @Date: 2025-04-23 08:20:08
 * @LastEditors: yeyuxiu
 * @LastEditTime: 2025-05-03 10:49:34
 * @Description: 配置文件
 */
import { defineConfig } from '@umijs/max';
import proxy from './proxy';
import routes from './routes';
import webpackConfig from './webpack.config';

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV ?? '');

export default defineConfig({
  antd: {
    momentPicker: true,
  },
  initialState: {},
  request: {},
  access: {},
  model: {},
  dva: {},

  plugins: [],

  define: {
    APP_TYPE: process.env.APP_TYPE || '',
  },
  // 分包
  codeSplitting: {
    jsStrategy: 'granularChunks',
  },
  // babel-plugin-transform-remove-console 暂时无法安装
  extraBabelPlugins: [IS_PROD ? 'transform-remove-console' : ''],
  extraPostCSSPlugins: [require('tailwindcss'), require('autoprefixer')],
  // layout: {
  //   title: 'react+umi脚手架',
  // },
  npmClient: 'pnpm',

  // locale: {
  //   // 默认使用 src/locales/zh-CN.ts 作为多语言文件
  //   default: 'zh-CN',
  // baseSeparator: '-',
  // },

  hash: true,

  targets: {
    ie: 9,
  },
  // theme: {
  //   '@primary-color': '#448EF7',
  //   'root-entry-name': 'variable',
  //   '@border-radius-base': '4px',
  // },

  // 定制类名生成模式
  cssLoader: {
    // 这里的 modules 可以接受 getLocalIdent
    modules: {
      getLocalIdent: (context: any, _: any, localName: any) => {
        if (
          context.resourcePath.includes('node_modules') ||
          context.resourcePath.includes('ant.design.pro.less') ||
          context.resourcePath.includes('global.less')
        ) {
          return localName;
        }
        return localName;
      },
    },
  },

  lessLoader: {
    javascriptEnabled: true,
  },

  // 放在 src/icons 使用 <icon src="local:iconName">
  icons: {
    autoInstall: {},
  },

  cssPublicPath: 'src/assets', // 为 CSS 中的图片、文件等外部资源指定自定义公共路径。

  // 不识别 components 和 models 目录下的文件为路由
  conventionRoutes: {
    exclude: [/\/components\//, /\/models\//],
  },

  // clientLoader:{} // 可以让 Umi 提前在页面组件尚未加载好的时候提前进行数据的加载，避免瀑布流请求的问题

  // option + click 页面定位源码
  clickToComponent: { editor: 'vscode' },

  // 代理配置
  proxy: proxy,
  history: { type: 'browser' },
  // 路由配置
  routes: routes,
  // 扩展 Umi 内置的 webpack 配置
  chainWebpack: webpackConfig,
});
