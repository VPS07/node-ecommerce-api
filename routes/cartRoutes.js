const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const verifyToken = require("../middleware/authMiddleware");

// Add a product to the cart
router.post("/add", verifyToken, cartController.addToCart);

// View the cart
router.get("/view", verifyToken, cartController.viewCart);

// Update the quantity of a product in the cart
router.put("/update", verifyToken, cartController.updateQuantity);

// Remove a product from the cart
router.delete("/remove/:productId", verifyToken, cartController.removeFromCart);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: API endpoints for managing the user's shopping cart.
 */

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Add a product to the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 example: "64df29da7ee99d3ff3a16d8f"
 *               quantity:
 *                 type: number
 *                 example: 1
 *     responses:
 *       201:
 *         description: Product added to the cart
 *       500:
 *         description: Something went wrong
 */

/**
 * @swagger
 * /api/cart/update:
 *   put:
 *     summary: Update the quantity of a product in the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID of the product.
 *                 example: "64df29da7ee99d3ff3a16d8f"
 *               quantity:
 *                 type: number
 *                 description: Updated quantity of the product.
 *                 example: 3
 *     responses:
 *       201:
 *         description: Cart updated
 *       404:
 *         description: Product not found in cart
 *       500:
 *         description: Something went wrong
 */

/**
 * @swagger
 * /api/cart/view:
 *   get:
 *     summary: View the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Retrieved cart details
 *       500:
 *         description: Something went wrong
 */

/**
 * @swagger
 * /api/cart/remove/{productId}:
 *   delete:
 *     summary: Remove a product from the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         description: ID of the product to remove
 *         example: "64df29da7ee99d3ff3a16d8f"
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item removed from cart
 *       404:
 *         description: Item not found in cart
 *       500:
 *         description: Something went wrong
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     CartItem:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           description: ID of the product.
 *           example: "64df29da7ee99d3ff3a16d8f"
 *         quantity:
 *           type: number
 *           description: Quantity of the product in the cart.
 *           example: 0
 *       required:
 *         - productId
 *         - quantity
 *
 *     UserCart:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: ID of the user.
 *           example: "64df95bc2b655c04a8cf4b78"
 *         items:
 *           type: array
 *           description: List of items in the user's cart.
 *           items:
 *             $ref: '#/components/schemas/CartItem'
 *       required:
 *         - userId
 *         - items
 */
