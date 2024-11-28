const { StatusCodes } = require("http-status-codes");
const { Product } = require("../models/Product");

const create = async (req, res) => {
  const { title, description, price } = req.body;

  const product = await Product.create({ title, description, price });
  res.status(StatusCodes.CREATED).json({ product: product });
};

module.exports = { create };
