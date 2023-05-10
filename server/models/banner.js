import mongoose from "mongoose";
const bannerSchema = new mongoose.Schema({
  selectedFile: String,
});

const bannerMessage = mongoose.model("banner", bannerSchema);
export default bannerMessage;


