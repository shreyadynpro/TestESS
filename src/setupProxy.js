const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Proxy all timesheet requests to the external service
  app.use(
    '/timesheet-proxy',
    createProxyMiddleware({
      target: 'https://mis.dynprocloud.com',
      changeOrigin: true,
      pathRewrite: {
        '^/timesheet-proxy': '', // Remove the /timesheet-proxy prefix
      },
      onProxyRes: function(proxyRes, req, res) {
        // Remove headers that prevent iframe embedding
        delete proxyRes.headers['x-frame-options'];
        delete proxyRes.headers['content-security-policy'];
        
        // Set permissive headers to allow embedding
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        
        // Preserve cookies for session management
        proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
      },
    })
  );
};
