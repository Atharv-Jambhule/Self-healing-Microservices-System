const logs = require("./data/logs");

const restartService = require(
  "./selfHealingEngine"
);

let count = 0;

const detectAnomalies = async () => {

  console.log(
    "🚀 anomaly detector triggered"
  );

  count++;

  if (count >= 3) {

    logs.push({
      timestamp: new Date(),
      service: "auth-service",
      event:
        "High memory anomaly detected",
    });

    console.log(
      "⚠ High memory anomaly detected"
    );

    restartService("auth-service");

    logs.push({
      timestamp: new Date(),
      service: "auth-service",
      event:
        "Self-healing restart triggered",
    });

    console.log(
      "♻ Self-healing restart triggered"
    );

    count = 0;
  }
};

module.exports = detectAnomalies;