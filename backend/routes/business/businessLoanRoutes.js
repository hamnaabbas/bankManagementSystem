/**
 * @swagger
 * tags:
 *   name: Business Loans
 *   description: Business loan management
 */

const express = require("express");

const {
  getAll,
  getOne,
  create,
  update,
  delete: deleteLoan,
} = require("../../controllers/business/businessLoanController");
const authenticationMiddleware = require("../../middleware/business/authMiddleware");
const authorizeRoles = require("../../middleware/business/authorizeRoles");
const loanValidation = require("../../middleware/business/loanValidation");
const validateRepaymentSchedule = require("../../middleware/business/validationMiddleware");

const router = express.Router();

// Apply authentication middleware globally
router.use(authenticationMiddleware);

/**
 * @swagger
 * /business-loans:
 *   get:
 *     summary: Retrieve all business loans
 *     tags: [Business Loans]
 */
router.get("/", authorizeRoles("Loan Manager", "Admin"), getAll);

/**
 * @swagger
 * /business-loans/{id}:
 *   get:
 *     summary: Get a business loan by ID
 *     tags: [Business Loans]
 */
router.get("/:id", authorizeRoles("Loan Manager", "Admin", "Business User"), getOne);

/**
 * @swagger
 * /business-loans:
 *   post:
 *     summary: Create a new business loan
 *     tags: [Business Loans]
 */
router.post(
  "/",
  authorizeRoles("Admin"),
  loanValidation,
  validateRepaymentSchedule,
  create
);

/**
 * @swagger
 * /business-loans/{id}:
 *   put:
 *     summary: Update a business loan by ID
 *     tags: [Business Loans]
 */
router.put(
  "/:id",
  authorizeRoles("Loan Manager", "Admin"),
  loanValidation,
  validateRepaymentSchedule,
  update
);

/**
 * @swagger
 * /business-loans/{id}:
 *   delete:
 *     summary: Delete a business loan by ID
 *     tags: [Business Loans]
 */
router.delete("/:id", authorizeRoles("Admin"), deleteLoan);

module.exports = router;