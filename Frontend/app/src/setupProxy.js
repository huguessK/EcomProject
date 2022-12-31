const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // You can pass in an array too eg. ['/api', '/another/path']
    createProxyMiddleware({
      target: process.env.REACT_APP_SERVER,
      changeOrigin: true,
    })
  );
};