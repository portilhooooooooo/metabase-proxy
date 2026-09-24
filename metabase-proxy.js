const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const target = String(process.env.METABASE_ORIGIN_URL || "").trim();
const proxySecret = String(process.env.METABASE_PROXY_SECRET || "").trim();

if (!target || !proxySecret) {
  throw new Error("METABASE_ORIGIN_URL and METABASE_PROXY_SECRET are required");
}

app.use(
  "/",
  createProxyMiddleware({
    target,
    changeOrigin: true,
    xfwd: true,
    headers: {
      "X-Metabase-Proxy-Secret": proxySecret,
    },
  })
);

app.listen(process.env.PORT || 3000);
