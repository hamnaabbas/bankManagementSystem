/**
 * @swagger
 * tags:
 *   name: Payrolls
 *   description: Payroll management
 */

const express = require("express");
const authenticationMiddleware = require("../../middleware/business/authMiddleware");
const authorizeRoles = require("../../middleware/business/authorizeRoles");
const payrollValidation = require("../../middleware/business/validationMiddleware");
const validateEmployeeIds = require("../../middleware/business/validateEmployeeIds");
const {
  getAll,
  getOne,
  create,
  update,
  delete: deletePayroll,
} = require("../../controllers/business/businessPayrollController");
const router = express.Router();
// Apply middleware
router.use(authenticationMiddleware);

/**
 * @swagger
 * /payrolls:
 *   get:
 *     summary: Retrieve all payrolls
 *     tags: [Payrolls]
 */
router.get("/", getAll);

/**
 * @swagger
 * /payrolls/{id}:
 *   get:
 *     summary: Get payroll by ID
 *     tags: [Payrolls]
 */
router.get("/:id", getOne);

/**
 * @swagger
 * /payrolls:
 *   post:
 *     summary: Create a new payroll
 *     tags: [Payrolls]
 */
router.post(
  "/",
  authorizeRoles("HR Manager", "Admin"),
  payrollValidation,
  validateEmployeeIds,
  create
);

/**
 * @swagger
 * /payrolls/{id}:
 *   put:
 *     summary: Update payroll by ID
 *     tags: [Payrolls]
 */
router.put(
  "/:id",
  authorizeRoles("HR Manager", "Admin"),
  payrollValidation,
  validateEmployeeIds,
  update
);

/**
 * @swagger
 * /payrolls/{id}:
 *   delete:
 *     summary: Delete payroll by ID
 *     tags: [Payrolls]
 */
router.delete("/:id", authorizeRoles("Admin"), deletePayroll);

module.exports = router;