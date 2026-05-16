const { exec } = require("child_process");

const logs = require("./data/logs");

const restartedServices = {};
const restartService = (serviceName) => {

  const now = Date.now();

  const cooldown = 60000;

  if (
    restartedServices[serviceName] &&
    now - restartedServices[serviceName]
      < cooldown
  ) {

    console.log(
      `⏳ Cooldown active for ${serviceName}`
    );

    return;
  }

  restartedServices[serviceName] = now;

  console.log(
    `♻ Restarting ${serviceName}`
  );

  exec(
    `docker restart ${serviceName}`,
    (error, stdout, stderr) => {

      if (error) {

        console.log(
          `❌ Restart failed: ${serviceName}`
        );

        logs.push({
          timestamp: new Date(),
          service: serviceName,
          event: "Restart failed",
        });

        return;
      }

      console.log(
        `✔ ${serviceName} restarted`
      );

      logs.push({
        timestamp: new Date(),
        service: serviceName,
        event:
          "Service restarted automatically",
      });
    }
  );
};
module.exports = restartService;