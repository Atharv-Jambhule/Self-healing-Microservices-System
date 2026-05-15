const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const promClient = require("prom-client");

const orderRoutes = require("./routes/orderRoutes");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

promClient.collectDefaultMetrics();

app.use("/", orderRoutes);

app.get("/metrics", async (req, res) => {

  res.set(
    "Content-Type",
    promClient.register.contentType
  );

  res.end(await promClient.register.metrics());
});

const PORT =
  process.env.ORDER_SERVICE_PORT || 3003;

app.listen(PORT, () => {
  console.log(
    `🚀 Order Service running on port ${PORT}`
  );
});