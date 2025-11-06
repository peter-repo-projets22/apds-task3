const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://localhost:3000',
      changeOrigin: true,
      secure: false,
      logLevel: 'debug',
      timeout: 60000, // Increase timeout to 60 seconds
      proxyTimeout: 60000,
    })
  );
};