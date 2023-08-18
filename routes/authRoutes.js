const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

// User registration
router.route("/register").post(register);

// User login
router.route("/login").post(login);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User registration and login APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         emailId:
 *           type: string
 *           description: User's email address
 *           example: user@example.com
 *         password:
 *           type: string
 *           description: User's password
 *           example: mysecurepassword
 */

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User registration and login APIs
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: EmailId already exists
 *       500:
 *         description: Something went wrong
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authenticate user and generate JWT token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: JWT token generated successfully
 *       404:
 *         description: Invalid emailId or password
 *       500:
 *         description: Something went wrong
 */
