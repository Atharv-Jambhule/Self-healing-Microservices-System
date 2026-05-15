const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const promClient = require("prom-client");

const paymentRoutes = require(
  "./routes/paymentRoutes"
);

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

promClient.collectDefaultMetrics();

app.use("/", paymentRoutes);

app.get("/metrics", async (req, res) => {

  res.set(
    "Content-Type",
    promClient.register.contentType
  );

  res.end(await promClient.register.metrics());
});

const PORT =
  process.env.PAYMENT_SERVICE_PORT || 3004;

app.listen(PORT, () => {
  console.log(
    `🚀 Payment Service running on port ${PORT}`
  );
});