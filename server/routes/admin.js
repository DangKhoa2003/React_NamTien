import express from "express";
import { getAdmin } from "../controllers/admin.js";
const router = express.Router();

// http://localhost:5000/products

router.get("/", getAdmin);
export default router;