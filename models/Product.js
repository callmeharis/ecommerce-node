const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      minLength: 3,
      maxLength: 20,
    },
    description: {
      type: String,
      required: [true, "Please provide description"],
    },
    price: {
      type: Number,
      required: [true, "Please provide price"],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = { Product };
