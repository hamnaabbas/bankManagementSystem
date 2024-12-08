/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Role and permission management
 */

const express = require("express");
const {
  getAll,
  getOne,
  create,
  update,
  delete: deleteRole,
} = require("../../controllers/business/rolePermissionController");

const authenticationMiddleware1 = require("../../middleware/business/authenticationMiddleware");
const authorizeRoles = require("../../middleware/business/authorizeRoles");
const roleValidationMiddleware = require("../../middleware/business/validationMiddleware");
const checkRoleExists = require("../../middleware/business/checkRoleExistsMiddleware");


const router = express.Router();

// Authentication middleware applied globally
router.use(authenticationMiddleware1);


/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Retrieve all roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: List of roles
 */
router.get("/", authorizeRoles("Admin", "HR Manager"), getAll);

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Get a role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Role ID
 *     responses:
 *       200:
 *         description: Role details
 */
router.get("/:id", authorizeRoles("Admin", "HR Manager"), checkRoleExists, getOne);

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
 *     responses:
 *       201:
 *         description: Role created
 */
router.post("/", authorizeRoles("Admin"), roleValidationMiddleware, create);

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Update a role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Role ID
 *     responses:
 *       200:
 *         description: Role updated
 */
router.put("/:id", authorizeRoles("Admin"), checkRoleExists, roleValidationMiddleware, update);

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Delete a role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Role ID
 *     responses:
 *       200:
 *         description: Role deleted
 */
router.delete("/:id", authorizeRoles("Admin"), checkRoleExists, deleteRole);

module.exports = router;
