const logs = require(
  "../data/logs"
);

const checkServices =
  async (req, res) => {

  const services = [

    {
      service: "auth-service",
      status: "healthy"
    },

    {
      service: "user-service",
      status: "healthy"
    },

    {
      service: "order-service",
      status: "healthy"
    },

    {
      service: "payment-service",
      status: "healthy"
    }
  ];

  console.log(
    "📋 Sending logs:",
    logs
  );

  res.json({
    services,
    logs
  });
};

module.exports =
  checkServices;