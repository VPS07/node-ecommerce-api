const Product = require("../models/Product");

const getProductsByCategoryId = async (req, res) => {
  const categoryId = parseInt(req.params.categoryId);

  try {
    const products = await Product.find({ categoryId: categoryId });
    res.status(200).json(products);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getProductById = async (req, res) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findOne({ _id: productId });
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = { getProductsByCategoryId, getProductById };
