import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
  auth: String,
});

const PostMessage = mongoose.model("post", postSchema);
export default PostMessage;
