const processPayment = async (req, res) => {

  try {

    // Simulate memory load
    const memoryHog = [];

    for (let i = 0; i < 500000; i++) {
      memoryHog.push({
        index: i,
        value: "PAYMENT_DATA_SIMULATION",
      });
    }

    res.status(200).json({
      message: "Payment processed successfully",
      payment: {
        userId: req.user.id,
        amount: req.body.amount,
        status: "SUCCESS",
      },
    });

  } catch (error) {

    res.status(500).json({
      message: "Payment failed",
    });
  }
};

module.exports = {
  processPayment,
};