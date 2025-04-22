export default {
  '/api': {
    target: 'http://127.0.0.1:15601',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      '^/api': '',
    },
  },
};
