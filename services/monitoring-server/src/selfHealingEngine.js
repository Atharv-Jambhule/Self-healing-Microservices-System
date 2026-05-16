const Docker = require("dockerode");

const logs = require("./data/logs");

const docker = new Docker({
  socketPath: "/var/run/docker.sock",
});

const cooldowns = {};

const restartService = async (
  serviceName
) => {

  const now = Date.now();

  if (
    cooldowns[serviceName] &&
    now - cooldowns[serviceName] <
      30000
  ) {

    console.log(
      `⏳ Cooldown active for ${serviceName}`
    );

    return;
  }

  cooldowns[serviceName] = now;

  try {

    console.log(
      `♻ Restarting ${serviceName}`
    );

    const container =
      docker.getContainer(serviceName);

    await container.restart();

    logs.push({
      timestamp: new Date(),
      service: serviceName,
      event:
        "Container restarted successfully",
    });

    console.log(
      `✔ ${serviceName} restarted`
    );

  } catch (error) {

    logs.push({
      timestamp: new Date(),
      service: serviceName,
      event: "Restart failed",
    });

    console.log(
      `❌ Restart failed for ${serviceName}`
    );
  }
};

module.exports = restartService;