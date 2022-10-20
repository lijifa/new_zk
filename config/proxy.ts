/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    '/apis/': {
      target: 'http://192.168.1.113:8090',
      changeOrigin: true,
      pathRewrite: { '^/apis': '' },
    },
  },
  test: {
    '/apis/': {
      target: 'http://192.168.1.201',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/draw/': {
      target: 'http://192.168.1.201',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  prod: {
    '/apis/': {
      target: 'http://zg.hdzhenergy.cn/',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
