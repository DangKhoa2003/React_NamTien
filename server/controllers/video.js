import mongoose from "mongoose";
import VideoMessage from '../models/video.js'

export const getVideo = async (req, res) => {
  try {
    const Video = await VideoMessage.find();
    res.status(200).json(Video);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createVideo = async (req, res) => {
  const video = req.body;

  const newVideo = new VideoMessage(video);

  try {
    await newVideo.save();

    // https://www.restapitutorial.com/httpstatuscodes.html

    res.status(201).json(newVideo);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateVideo = async (req, res) => {
  const { id: _id } = req.params;
  const video = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  const updateVideo = await VideoMessage.findByIdAndUpdate(
    _id,
    { ...video, _id },
    { new: true }
  );

  res.json(updateVideo);
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  await VideoMessage.findByIdAndRemove(id);

  res.json({ message: "Video deleted successfully" });
};

