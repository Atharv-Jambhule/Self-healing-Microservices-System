const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const promClient = require("prom-client");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

promClient.collectDefaultMetrics();

app.use("/api/auth", authRoutes);

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", promClient.register.contentType);
  res.end(await promClient.register.metrics());
});

const PORT = process.env.AUTH_SERVICE_PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Auth Service running on port ${PORT}`);
});