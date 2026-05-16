const express = require("express");

const router = express.Router();

const {
  getSystemStatus,
} = require("../controllers/monitoringController");

router.get(
  "/status",
  getSystemStatus
);

module.exports = router;