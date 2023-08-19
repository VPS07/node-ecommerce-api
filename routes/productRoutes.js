const express = require("express");
const router = express.Router();
const {
  getProductById,
  getProductsByCategoryId,
} = require("../controllers/productController");

// Define the route for getting a product by ID
router.get("/:categoryId", getProductsByCategoryId);
router.get("/product/:productId", getProductById);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API for managing products
 */

/**
 * @swagger
 * /api/products/{categoryId}:
 *   get:
 *     summary: Get products by category ID
 *     tags: [Products]
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         description: ID of the category to retrieve products for
 *         example: 2
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: No products found for the given category ID
 *         content:
 *           application/json:
 *             example:
 *               message: No products found for the given category ID
 */

/**
 * @swagger
 * /api/products/product/{productId}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product
 *         example: "64df29da7ee99d3ff3a16d94"
 *     responses:
 *       '200':
 *         description: Successful response. Returns the requested product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '404':
 *         description: Product not found.
 *         content:
 *           application/json:
 *             example:
 *               message: Product not found.
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated product ID
 *         categoryId:
 *           type: number
 *           description: The ID of the category to which the product belongs
 *         title:
 *           type: string
 *           description: The title of the product
 *         price:
 *           type: number
 *           description: The price of the product
 *         description:
 *           type: string
 *           description: The description of the product
 *         availability:
 *           type: boolean
 *           description: The availability status of the product
 */
