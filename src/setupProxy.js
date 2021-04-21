const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/search",
    createProxyMiddleware({
      target: "https://api.deezer.com/",
      changeOrigin: true,
    })
  );
  app.use(
    "/api/v1",
    createProxyMiddleware({
      target: "https://www.balldontlie.io/",
      changeOrigin: true,
    })
  );
};
