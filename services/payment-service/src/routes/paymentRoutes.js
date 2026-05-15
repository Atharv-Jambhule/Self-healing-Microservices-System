const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  processPayment,
} = require("../controllers/paymentController");

router.post(
  "/process",
  authMiddleware,
  processPayment
);

module.exports = router;