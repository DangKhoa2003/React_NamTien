import express from "express";
import { getCompany, createCompany, updateCompany, deleteCompany } from "../controllers/company.js";
const router = express.Router();

// http://localhost:5000/products

router.get("/", getCompany);
router.post("/", createCompany);
router.patch("/:id", updateCompany);
router.delete("/:id", deleteCompany);
export default router;