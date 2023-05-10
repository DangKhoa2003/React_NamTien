import mongoose from "mongoose";
const videoSchema = new mongoose.Schema({
  name: String,
  link: String,
  auth: String,
});

const VideoMessage = mongoose.model("video", videoSchema);
export default VideoMessage;
