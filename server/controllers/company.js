import mongoose from "mongoose";
import CompanyMessage from '../models/company.js'

export const getCompany = async (req, res) => {
  try {
    const Company = await CompanyMessage.find();
    res.status(200).json(Company);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCompany = async (req, res) => {
  const company = req.body;

  const newCompany = new CompanyMessage(company);

  try {
    await newCompany.save();

    // https://www.restapitutorial.com/httpstatuscodes.html

    res.status(201).json(newCompany);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateCompany = async (req, res) => {
  const { id: _id } = req.params;
  const company = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No company with that id");

  const updateCompany = await CompanyMessage.findByIdAndUpdate(
    _id,
    { ...company, _id },
    { new: true }
  );

  res.json(updateCompany);
};

export const deleteCompany = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No company with that id");

  await CompanyMessage.findByIdAndRemove(id);

  res.json({ message: "Product deleted successfully" });
};

