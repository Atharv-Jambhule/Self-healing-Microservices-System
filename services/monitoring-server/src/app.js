const express = require("express");

const cors = require("cors");

const detectAnomalies = require(
  "./anomalyDetector"
);

const checkServices = require(
  "./controllers/monitoringController"
);

const app = express();

app.use(cors());

app.use(express.json());

// Status API

app.get(
  "/status",
  checkServices
);

// Trigger anomaly detection every 10 sec

setInterval(() => {

  console.log(
    "🚀 anomaly detector triggered"
  );

  detectAnomalies();

}, 10000);

const PORT = 5001;

app.listen(PORT, () => {

  console.log(
    `🚀 Monitoring Server running on port ${PORT}`
  );
});