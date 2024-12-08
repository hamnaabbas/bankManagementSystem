/**
 * @swagger
 * tags:
 *   name: Invoices
 *   description: Invoice management
 */

const express = require("express");
const {
  getAll,
  getOne,
  create,
  update,
  delete: deleteInvoice,
} = require("../../controllers/business/invoiceController");
const authenticationMiddleware1 = require("../../middleware/business/authenticationMiddleware");
const authorizeRoles = require("../../middleware/business/authorizeRoles");
const invoiceValidation = require("../../middleware/business/validationMiddleware");
const paymentStatusMiddleware = require("../../middleware/business/paymentStatusMiddleware");
const paginationMiddleware = require("../../middleware/business/paginationMiddleware");

const router = express.Router();
// Apply authentication middleware globally
router.use(authenticationMiddleware1);

/**
 * @swagger
 * /invoices:
 *   get:
 *     summary: Retrieve all invoices
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: List of invoices
 */
router.get("/", paginationMiddleware, authorizeRoles("Finance Manager", "Admin"), getAll);

/**
 * @swagger
 * /invoices/{id}:
 *   get:
 *     summary: Get an invoice by ID
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Invoice ID
 *     responses:
 *       200:
 *         description: Invoice details
 */
router.get("/:id", authorizeRoles("Finance Manager", "Admin", "Business User"), getOne);

/**
 * @swagger
 * /invoices:
 *   post:
 *     summary: Create a new invoice
 *     tags: [Invoices]
 *     responses:
 *       201:
 *         description: Invoice created
 */
router.post("/", authorizeRoles("Admin"), invoiceValidation, create);

/**
 * @swagger
 * /invoices/{id}:
 *   put:
 *     summary: Update an invoice by ID
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Invoice ID
 *     responses:
 *       200:
 *         description: Invoice updated
 */
router.put("/:id", authorizeRoles("Admin"), invoiceValidation, update);

/**
 * @swagger
 * /invoices/{id}:
 *   delete:
 *     summary: Delete an invoice by ID
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Invoice ID
 *     responses:
 *       200:
 *         description: Invoice deleted
 */
router.delete("/:id", authorizeRoles("Admin"), deleteInvoice);
/**
 * @swagger
 * /invoices/{id}/track:
 *   get:
 *     summary: Track an invoice's payment status
 *     tags: [Invoices]
 */
router.get("/:id/track", paymentStatusMiddleware, (req, res) => {
  res.status(200).json(req.invoice);
});
module.exports = router;
