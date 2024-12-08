/**
 * @swagger
 * tags:
 *   name: Business Accounts
 *   description: Business account management
 */

const express = require("express");


const {
  getAll,
  getOne,
  create,
  update,
  delete: deleteAccount,
} = require("../../controllers/business/businessAccountController");
const authenticate1 = require("../../middleware/business/authMiddleware");
const validateBusinessAccountData = require("../../middleware/business/validationMiddleware");
const validateQueryParams1 = require("../../middleware/business/validateQueryParams");
const errorHandler1 = require("../../middleware/business/errorHandler");
const authorizeRoles = require("../../middleware/business/authorizeRoles");

const router = express.Router();
router.use(authenticate1); // Require authentication for all routes

/**
 * @swagger
 * /business-accounts:
 *   get:
 *     summary: Retrieve all business accounts
 *     tags: [Business Accounts]
 *     responses:
 *       200:
 *         description: List of business accounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier for the business account
 *                   business_name:
 *                     type: string
 *                     description: The name of the business
 *                   business_id:
 *                     type: string
 *                     description: The unique business ID
 *                   status:
 *                     type: string
 *                     enum: [active, suspended, closed]
 *                     description: The status of the business account
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     description: The creation timestamp of the business account
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *                     description: The last update timestamp of the business account
 */
router.get("/", validateQueryParams1, getAll); // Optional query params validation

/**
 * @swagger
 * /business-accounts/{id}:
 *   get:
 *     summary: Get a business account by ID
 *     tags: [Business Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Business account ID
 *     responses:
 *       200:
 *         description: Business account details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier for the business account
 *                 business_name:
 *                   type: string
 *                   description: The name of the business
 *                 business_id:
 *                   type: string
 *                   description: The unique business ID
 *                 linked_accounts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       account_id:
 *                         type: string
 *                         description: ID of the linked account
 *                       account_name:
 *                         type: string
 *                         description: Name of the linked account
 *                       balance:
 *                         type: number
 *                         description: Balance of the linked account
 *                 status:
 *                   type: string
 *                   enum: [active, suspended, closed]
 *                   description: The status of the business account
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   description: The creation timestamp of the business account
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   description: The last update timestamp of the business account
 *       404:
 *         description: Business account not found
 */
router.get("/:id", getOne);

/**
 * @swagger
 * /business-accounts:
 *   post:
 *     summary: Create a new business account
 *     tags: [Business Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               business_name:
 *                 type: string
 *                 description: The name of the business
 *               business_id:
 *                 type: string
 *                 description: The unique business ID
 *               linked_accounts:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     account_id:
 *                       type: string
 *                       description: ID of the linked account
 *                     account_name:
 *                       type: string
 *                       description: Name of the linked account
 *                     balance:
 *                       type: number
 *                       description: Balance of the linked account
 *               created_by:
 *                 type: string
 *                 description: ID of the user creating the business account
 *     responses:
 *       201:
 *         description: Business account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier for the business account
 *                 business_name:
 *                   type: string
 *                   description: The name of the business
 *                 business_id:
 *                   type: string
 *                   description: The unique business ID
 *                 status:
 *                   type: string
 *                   enum: [active, suspended, closed]
 *                   description: The status of the business account
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   description: The creation timestamp of the business account
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   description: The last update timestamp of the business account
 */
router.post(
  "/",
  authorizeRoles("Admin"), // Restrict to Admin role
  validateBusinessAccountData,
  create
);

/**
 * @swagger
 * /business-accounts/{id}:
 *   put:
 *     summary: Update a business account by ID
 *     tags: [Business Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Business account ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               business_name:
 *                 type: string
 *                 description: The name of the business
 *               linked_accounts:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     account_id:
 *                       type: string
 *                       description: ID of the linked account
 *                     account_name:
 *                       type: string
 *                       description: Name of the linked account
 *                     balance:
 *                       type: number
 *                       description: Balance of the linked account
 *               status:
 *                 type: string
 *                 enum: [active, suspended, closed]
 *                 description: The status of the business account
 *     responses:
 *       200:
 *         description: Business account updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier for the business account
 *                 business_name:
 *                   type: string
 *                   description: The name of the business
 *                 business_id:
 *                   type: string
 *                   description: The unique business ID
 *                 status:
 *                   type: string
 *                   enum: [active, suspended, closed]
 *                   description: The status of the business account
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   description: The creation timestamp of the business account
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   description: The last update timestamp of the business account
 *       404:
 *         description: Business account not found
 */
router.put(
  "/:id",
  authorizeRoles("Admin"), // Restrict to Admin role
  validateBusinessAccountData,
  update
);


/**
 * @swagger
 * /business-accounts/{id}:
 *   delete:
 *     summary: Delete a business account by ID
 *     tags: [Business Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Business account ID
 *     responses:
 *       200:
 *         description: Business account deleted successfully
 *       404:
 *         description: Business account not found
 */

router.delete("/:id", authorizeRoles("Admin"), deleteAccount); // Restrict to Admin role

router.use(errorHandler1); // Apply error handling to all routes

module.exports = router;