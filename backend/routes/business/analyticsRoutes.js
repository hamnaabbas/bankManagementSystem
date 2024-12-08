const express = require("express");
const {
  getAll,
  getOne,
  create,
  update,
  delete: deleteAnalytics,
} = require("../../controllers/business/analyticsController");

const { authenticate } = require("../../middlewares/business/authMiddleware");
const { validateAnalyticsData } = require("../../middlewares/business/validationMiddleware");
const { errorHandler } = require("../../middlewares/errorHandler");

const Chart = require("chart.js");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: Analytics management
 */

// Middleware
router.use(authenticate); // Apply authentication middleware globally

/**
 * @swagger
 * /analytics:
 *   get:
 *     summary: Retrieve all analytics
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: List of analytics
 */
router.get("/", getAll);

/**
 * @swagger
 * /analytics/{id}:
 *   get:
 *     summary: Get analytics by ID
 *     tags: [Analytics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Analytics ID
 *     responses:
 *       200:
 *         description: Analytics details
 */
router.get("/:id", getOne);

/**
 * @swagger
 * /analytics:
 *   post:
 *     summary: Create new analytics
 *     tags: [Analytics]
 *     responses:
 *       201:
 *         description: Analytics created
 */
router.post("/", validateAnalyticsData, create);

/**
 * @swagger
 * /analytics/{id}:
 *   put:
 *     summary: Update analytics by ID
 *     tags: [Analytics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Analytics ID
 *     responses:
 *       200:
 *         description: Analytics updated
 */
router.put("/:id", validateAnalyticsData, update);

/**
 * @swagger
 * /analytics/{id}:
 *   delete:
 *     summary: Delete analytics by ID
 *     tags: [Analytics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Analytics ID
 *     responses:
 *       200:
 *         description: Analytics deleted
 */
router.delete("/:id", deleteAnalytics);

// Error Handling Middleware
router.use(errorHandler);

module.exports = router;
