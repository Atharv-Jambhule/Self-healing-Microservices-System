const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const promClient = require("prom-client");

const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

promClient.collectDefaultMetrics();

app.use("/", userRoutes);

app.get("/health", (req, res) => {

  res.status(200).json({
    service: "user-service",
    status: "healthy",
  });
});

app.get("/metrics", async (req, res) => {

  res.set(
    "Content-Type",
    promClient.register.contentType
  );

  res.end(
    await promClient.register.metrics()
  );
});

const PORT =
  process.env.USER_SERVICE_PORT || 3002;

app.listen(PORT, () => {

  console.log(
    `🚀 User Service running on port ${PORT}`
  );
});