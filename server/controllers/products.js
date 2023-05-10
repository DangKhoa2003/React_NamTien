import mongoose from "mongoose";
import ProductMessage from "../models/productMessage.js";

export const getProducts = async (req, res) => {
  try {
    const ProductMessages = await ProductMessage.find();
    res.status(200).json(ProductMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProducts = async (req, res) => {
  const product = req.body;

  const newProduct = new ProductMessage(product);

  try {
    await newProduct.save();

    // https://www.restapitutorial.com/httpstatuscodes.html

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateProducts = async (req, res) => {
  const { id: _id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  const updateProduct = await ProductMessage.findByIdAndUpdate(
    _id,
    { ...product, _id },
    { new: true }
  );

  res.json(updateProduct);
};

export const deleteProducts = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  await ProductMessage.findByIdAndRemove(id);

  res.json({ message: "Product deleted successfully" });
};

export const likeProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  const product = await ProductMessage.findById(id);
  const updateProduct = await ProductMessage.findByIdAndUpdate(
    id,
    {
      likeCount: product.likeCount >= 1 ? 0 : 1,
    },
    { new: true }
  );

  res.json(updateProduct);
};
