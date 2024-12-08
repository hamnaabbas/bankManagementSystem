/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Business transaction management
 */

const express = require("express");
const {
  getAll,
  getOne,
  create,
  update,
  delete: deleteTransaction,
} = require("../../controllers/business/businessTransactionController");
const authenticationMiddleware = require("../../middleware/business/authMiddleware");
const authorizeRoles = require("../../middleware/business/authorizeRoles");
const transactionValidation = require("../../middleware/business/transactionValidation");
const batchTransactionValidation = require("../../middleware/business/transactionValidation");
const paginationMiddleware = require("../../middleware/business/paginationMiddleware");


const router = express.Router();
// Apply authentication middleware globally
router.use(authenticationMiddleware);

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Retrieve all transactions
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: List of transactions
 */
router.get("/", paginationMiddleware, authorizeRoles("Finance Manager", "Admin"), getAll);

/**
 * @swagger
 * /transactions/{id}:
 *   get:
 *     summary: Get a transaction by ID
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     responses:
 *       200:
 *         description: Transaction details
 */
router.get("/:id", authorizeRoles("Finance Manager", "Admin", "Business User"), getOne);

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     responses:
 *       201:
 *         description: Transaction created
 */
router.post("/", authorizeRoles("Admin"), transactionValidation, create);
/**
 * @swagger
 * /transactions/batch:
 *   post:
 *     summary: Create multiple transactions
 *     tags: [Transactions]
 */
router.post("/batch", authorizeRoles("Admin"), batchTransactionValidation, create);

/**
 * @swagger
 * /transactions/{id}:
 *   put:
 *     summary: Update a transaction by ID
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     responses:
 *       200:
 *         description: Transaction updated
 */
router.put("/:id", authorizeRoles("Admin"), transactionValidation, update);

/**
 * @swagger
 * /transactions/{id}:
 *   delete:
 *     summary: Delete a transaction by ID
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     responses:
 *       200:
 *         description: Transaction deleted
 */
router.delete("/:id", authorizeRoles("Admin"), deleteTransaction);

module.exports = router;
