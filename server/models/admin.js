import mongoose from "mongoose";
const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const AdminMessage = mongoose.model("admin", adminSchema);
export default AdminMessage;
