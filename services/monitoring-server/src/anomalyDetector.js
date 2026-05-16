const axios = require("axios");

const logs = require("./data/logs");

const restartService = require(
  "./selfHealingEngine"
);

const detectAnomalies = async () => {

  try {

    console.log(
      "🤖 ML anomaly detection running"
    );

    const mlResponse =
      await axios.post(
        "http://host.docker.internal:6000/predict",
        {
          cpu: 95,
          memory: 500,
          requests: 800,
          response_time: 1500,
          restarts: 5
        }
      );

    if (mlResponse.data.anomaly) {

      const services = [
        "auth-service",
        "user-service",
        "order-service",
        "payment-service"
      ];

      const randomIndex =
        Math.floor(
          Math.random() *
          services.length
        );

      const serviceName =
        services[randomIndex];

      const logEntry = {
        timestamp: new Date(),
        service: serviceName,
        event: "🤖 ML anomaly detected"
      };

      logs.unshift(logEntry);

      if (logs.length > 50) {
        logs.pop();
      }

      console.log(
        "📋 Added log:",
        logEntry
      );

      restartService(serviceName);
    }

  } catch (error) {

    console.error(
      "ML Detection Error:",
      error.message
    );
  }
};

module.exports =
  detectAnomalies;