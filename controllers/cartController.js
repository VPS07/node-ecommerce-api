const UserCart = require("../models/UserCart");

//it will add product to cart and if product already exists in cart then it will update the quantity
const addProductToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.userId;
    const userCart = await UserCart.findOne({ userId });
    if (userCart) {
      userCart.items.push({ productId, quantity });
      await userCart.save();
      return res.status(201).json(userCart);
    } else {
      // no userCart found for user, create new userCart
      const newUserCart = await UserCart.create({
        userId,
        items: [{ productId, quantity }],
      });
      return res.status(201).json(newUserCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateQuantityOfProduct = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.userId;
    const userCart = await UserCart.findOne({ userId });
    if (userCart) {
      const itemIndex = userCart.items.findIndex(
        (p) => p.productId == productId
      );

      // Check if product exists in cart if exists update quantity
      if (itemIndex > -1) {
        let productItem = userCart.items[itemIndex];
        productItem.quantity += quantity;
        userCart.items[itemIndex] = productItem;
      }
      // If product does not exists in cart then add it
      else
        return res.status(404).json({ message: "product not found in cart" });

      await userCart.save();
      return res.status(201).json(userCart);
    } else {
      // no userCart found for user, create new userCart
      return res.status(404).json({ message: "user cart not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const viewCart = async (req, res) => {
  try {
    const userId = req.userId;
    const userCart = await UserCart.findOne({ userId });
    if (userCart) {
      return res.status(200).json(userCart);
    }
    return res.status(200).json([]);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const removeItemFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const productId = req.params.productId;
    const userCart = await UserCart.findOne({ userId });
    // console.log(userCart);

    if (userCart) {
      const itemIndex = userCart.items.findIndex(
        (p) => p.productId == productId
      );

      if (itemIndex > -1) {
        userCart.items.splice(itemIndex, 1);
        // UserCart.updateOne({ userId }, { $set: { items: userCart.items } });
        await userCart.save();
        return res.status(200).json("Item removed from cart");
      } else {
        return res.status(404).json("Item not found in cart");
      }
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const cartController = {
  addToCart: addProductToCart,
  updateQuantity: updateQuantityOfProduct,
  viewCart,
  removeFromCart: removeItemFromCart,
};

module.exports = cartController;
