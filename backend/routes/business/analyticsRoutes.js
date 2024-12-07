const express = require("express");
const {
  getAllAnalytics,
  getAnalyticsById,
  createAnalytics,
  updateAnalytics,
  deleteAnalytics,
} = require("../controllers/analyticsController");
const router = express.Router();
router.get("/", getAllAnalytics);
router.get("/:id", getAnalyticsById);
router.post("/", createAnalytics);
router.put("/:id", updateAnalytics);
router.delete("/:id", deleteAnalytics);
module.exports = router;