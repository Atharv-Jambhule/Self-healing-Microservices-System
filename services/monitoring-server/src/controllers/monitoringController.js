const axios = require("axios");

const logs = require("../data/logs");

const checkServices = async (
  req,
  res
) => {

  const services = [

  {
    service: "auth-service",
    url:
      "http://auth-service:3001/health",
  },

  {
    service: "user-service",
    url:
      "http://user-service:3002/health",
  },

  {
    service: "order-service",
    url:
      "http://order-service:3003/health",
  },

  {
    service: "payment-service",
    url:
      "http://payment-service:3004/health",
  },
];

  const results = [];

  for (const service of services) {

    try {

      await axios.get(service.url);

      results.push({
        service: service.service,
        status: "healthy",
      });

    } catch (error) {

      results.push({
        service: service.service,
        status: "unhealthy",
      });

      logs.push({
        timestamp: new Date(),
        service: service.service,
        event:
          "Service unhealthy detected",
      });
    }
  }

  res.json({
    services: results,
    logs,
  });
};

module.exports = checkServices;