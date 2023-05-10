import mongoose from "mongoose";
import bannerMessage from "../models/banner.js";

export const getBanner = async (req, res) => {
  try {
    const banner = await bannerMessage.find();
    res.status(200).json(banner);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createBanner = async (req, res) => {
  const banner = req.body;

  const newBanner = new bannerMessage(banner);

  try {
    await newBanner.save();

    // https://www.restapitutorial.com/httpstatuscodes.html

    res.status(201).json(newBanner);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateBanner = async (req, res) => {
  const { id: _id } = req.params;
  const banner = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  const updateBanner = await bannerMessage.findByIdAndUpdate(
    _id,
    { ...banner, _id },
    { new: true }
  );

  res.json(updateBanner);
};

export const deleteBanner = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  await bannerMessage.findByIdAndRemove(id);

  res.json({ message: "Product deleted successfully" });
};
