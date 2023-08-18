const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const verifyToken = require("../middleware/authMiddleware");

router.get("/history", verifyToken, orderController.orderHistory);
router.get("/:orderId", verifyToken, orderController.orderDetailById);
router.post("/place", verifyToken, orderController.placeOrder);
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Order management
 */
/**
 * @swagger
 * /api/order/history:
 *   get:
 *     summary: Get order history for a user
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with order history
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       404:
 *         description: No orders found for the user
 *       500:
 *         description: Something went wrong on the server
 */

/**
 * @swagger
 * /api/order/{orderId}:
 *   get:
 *     summary: Get order details by order ID
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the order to retrieve
 *     responses:
 *       200:
 *         description: Successful response with order details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *       500:
 *         description: Something went wrong on the server
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
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the order
 *           example: 5f8b92e20f4d2e001c2e50f5
 *         userId:
 *           type: string
 *           description: The ID of the user who placed the order
 *           example: 1234567890
 *         items:
 *           type: array
 *           description: Array of ordered items
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The ID of the product
 *                 example: 5f8b92e20f4d2e001c2e50f7
 *               quantity:
 *                 type: number
 *                 description: The quantity of the product ordered
 *                 example: 2
 *         orderDate:
 *           type: string
 *           format: date-time
 *           description: The date and time when the order was placed
 *           example: "2023-08-18T10:30:00Z"
 */

/**
 * @swagger
 * /api/order/place:
 *   post:
 *     summary: Place a new order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Something went wrong on the server
 */
