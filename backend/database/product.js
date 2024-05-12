const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Shopper");
const productSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  availbale: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("product", productSchema);
