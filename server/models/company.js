import mongoose from "mongoose";
const companySchema = new mongoose.Schema({
  title: String,
  image: String,
});

const CompanyMessage = mongoose.model("company", companySchema);
export default CompanyMessage;
