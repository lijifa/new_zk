import { defineConfig } from '@umijs/max';
import proxyCfg from './proxy';
import routes from './routes';

const REACT_APP_ENV = 'prod'; // dev: 开发；test：测试；prod：生产

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  locale: {
    antd: true,
    // 默认使用 src/locales/zh-CN.ts 作为多语言文件
    default: 'zh-CN',
    baseSeparator: '-',
  },
  //   layout: {
  //     title: '@umijs/max',
  //   },
  routes,
  npmClient: 'pnpm',
  publicPath: '/',
  // proxy: {
  //   '/api': {
  //     'target': 'http://192.168.1.201/',
  //     'changeOrigin': true,
  //     'pathRewrite': { '^/api' : '' },
  //   },
  // },

  proxy: proxyCfg[REACT_APP_ENV],

  // qiankun: {
  //   master: {
  //     apps: [
  //       {
  //         name: 'JQuery',
  //         entry: '//192.168.1.58:201/bussiness/companyU3d/index.html?a=1&titlename=华德智慧能源企业总览',
  //       }
  //     ],
  //   },
  // },
});
