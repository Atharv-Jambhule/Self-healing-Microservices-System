const createOrder = async (req, res) => {

  try {

    // Simulate CPU load
    for (let i = 0; i < 100000000; i++) {}

    res.status(201).json({
      message: "Order created successfully",
      order: {
        userId: req.user.id,
        product: req.body.product,
        quantity: req.body.quantity,
      },
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createOrder,
};