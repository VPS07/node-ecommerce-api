const Category = require("../models/Category");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (categories) res.status(200).json(categories);
    else res.status(404).json({ message: "No categories found" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = getCategories;
