const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  categoryId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: Number,
  description: String,
  availability: Boolean,
});

module.exports = mongoose.model("Product", productSchema);
