const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");

const {
  createProxyMiddleware,
} = require("http-proxy-middleware");

const promClient = require("prom-client");

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

promClient.collectDefaultMetrics();

app.use(
  "/api/auth",
  createProxyMiddleware({
    target: "http://auth-service:3001",
    changeOrigin: true,
  })
);

app.use(
  "/api/users",
  createProxyMiddleware({
    target: "http://user-service:3002",
    changeOrigin: true,
    pathRewrite: {
      "^/api/users": "",
    },
  })
);

app.use(
  "/api/orders",
  createProxyMiddleware({
    target: "http://order-service:3003",
    changeOrigin: true,
    pathRewrite: {
      "^/api/orders": "",
    },
  })
);

app.get("/metrics", async (req, res) => {
  res.set(
    "Content-Type",
    promClient.register.contentType
  );

  res.end(await promClient.register.metrics());
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(
    `🚀 API Gateway running on port ${PORT}`
  );
});