const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/api",
    proxy({
      target: "https://swapi.co/api/",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
      headers: {
        Connection: "keep-ali ve"
      }
    })
  );
};
