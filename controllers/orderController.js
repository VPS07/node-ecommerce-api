const Order = require("../models/Order");
const UserCart = require("../models/UserCart");

const placeOrder = async (req, res) => {
  const userId = req.userId;

  try {
    const userCart = await UserCart.findOne({ userId }).populate(
      "items.productId"
    );

    if (!userCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Create an order using items from the user's cart
    const order = new Order({
      userId: userCart.userId,
      items: userCart.items,
    });
    // Save the order and clear the user's cart
    await order.save();

    return res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const orderHistory = async (req, res) => {
  const userId = req.userId;

  try {
    const orders = await Order.find({ userId }).populate("items.productId");
    if (orders) {
      return res.status(200).json(orders);
    } else return res.status(404).json({ message: "No orders found" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const orderDetailById = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId).populate("items.productId");
    if (order) {
      return res.status(200).json(order);
    } else return res.status(404).json({ message: "Order not found" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const orderController = {
  placeOrder,
  orderHistory,
  orderDetailById,
};

module.exports = orderController;
