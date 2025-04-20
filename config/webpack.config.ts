/**
 * memo，当前 webpack-chain对象
 * env，当前环境，development、production 或 test 等
 * webpack，webpack 实例，用于获取其内部插件
 * createCSSRule，用于扩展其他 CSS 实现，比如 sass, stylus
 * @param {*} memo
 * @param {*} { env, webpack, createCSSRule }
 */
const webpackConfig = (memo: any) => {
  // 缓存，加快项目启动
  memo.cache(true);
};

export default webpackConfig;
