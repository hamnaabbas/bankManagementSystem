const express = require("express");
const requestController = require("../../controllers/business/requestController");
const authenticationMiddleware1 = require("../../middleware/business/authMiddleware");
const authorizeRoles = require("../../middleware/business/authorizeRoles");
const requestValidationMiddleware = require("../../middleware/business/validationMiddleware");
const filterRequestsMiddleware = require("../../middleware/business/filterRequestsMiddleware");
const router = express.Router();

// Authentication middleware applied globally
router.use(authenticationMiddleware1);

/**
 * @swagger
 * components:
 *   schemas:
 *     Request:
 *       type: object
 *       required:
 *         - user_id
 *         - request_type
 *         - details
 *       properties:
 *         user_id:
 *           type: string
 *           description: The ID of the user making the request
 *         request_type:
 *           type: string
 *           enum: [account-creation, role-change, balance-adjustment]
 *           description: The type of request
 *         details:
 *           type: string
 *           description: Details about the request
 *         status:
 *           type: string
 *           enum: [pending, approved, rejected]
 *           default: pending
 *           description: Status of the request
 *         handled_by:
 *           type: string
 *           description: The ID of the admin handling the request
 *       example:
 *         user_id: "60f7f87c9c5b3c001cf7b8e4"
 *         request_type: "role-change"
 *         details: "Requesting role change to Manager"
 *         status: "pending"
 */

/**
 * @swagger
 * tags:
 *   name: Requests
 *   description: API for managing user requests
 */

/**
 * @swagger
 * /api/requests:
 *   post:
 *     summary: Create a new request
 *     tags: [Requests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Request'
 *     responses:
 *       201:
 *         description: The request was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Request'
 *       400:
 *         description: Bad request
 */
router.post("/", requestValidationMiddleware, requestController.create);

/**
 * @swagger
 * /api/requests:
 *   get:
 *     summary: Get all requests
 *     tags: [Requests]
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: string
 *         description: Filter requests by user ID
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, approved, rejected]
 *         description: Filter requests by status
 *     responses:
 *       200:
 *         description: A list of requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Request'
 *       400:
 *         description: Bad request
 */
router.get("/", filterRequestsMiddleware, requestController.getAll);

/**
 * @swagger
 * /api/requests/{id}:
 *   get:
 *     summary: Get a request by ID
 *     tags: [Requests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the request to retrieve
 *     responses:
 *       200:
 *         description: The requested request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Request'
 *       404:
 *         description: Request not found
 */
router.get("/:id", requestController.getOne);

/**
 * @swagger
 * /api/requests/{id}:
 *   put:
 *     summary: Update a request by ID
 *     tags: [Requests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the request to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, approved, rejected]
 *               handled_by:
 *                 type: string
 *             example:
 *               status: "approved"
 *               handled_by: "60f7f87c9c5b3c001cf7b8e4"
 *     responses:
 *       200:
 *         description: The updated request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Request'
 *       404:
 *         description: Request not found
 */
router.put("/:id", authorizeRoles("Admin", "HR Manager"), requestValidationMiddleware, requestController.update);

/**
 * @swagger
 * /api/requests/{id}:
 *   delete:
 *     summary: Delete a request by ID
 *     tags: [Requests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the request to delete
 *     responses:
 *       200:
 *         description: The request was successfully deleted
 *       404:
 *         description: Request not found
 */
router.delete("/:id", authorizeRoles("Admin"), requestController.delete);

module.exports = router;
