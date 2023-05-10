import AdminMessages from '../models/admin.js'

export const getAdmin = async (req, res) => {
  try {
    const Admin = await AdminMessages.find();
    res.status(200).json(Admin);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
