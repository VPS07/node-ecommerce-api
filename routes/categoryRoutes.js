const express = require("express");
const router = express.Router();
const getCategories = require("../controllers/categoryController");

router.route("/").get(getCategories);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API for managing categories.
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get a list of categories.
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: A list of categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       404:
 *         description: No categories found.
 *         content:
 *           application/json:
 *             example:
 *               message: No categories found
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: number
 *         name:
 *           type: string
 */
