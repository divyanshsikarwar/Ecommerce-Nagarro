// making model of the product
const mongoose = require("mongoose");

//making basic schema and then making model
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
