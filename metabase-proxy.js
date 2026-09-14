const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(
  "/",
  createProxyMiddleware({
    target: "http://56.125.237.139",
    changeOrigin: true,
    xfwd: true,
    headers: {
      "X-Metabase-Proxy-Secret": process.env.METABASE_PROXY_SECRET,
    },
  })
);

app.listen(process.env.PORT || 3000);