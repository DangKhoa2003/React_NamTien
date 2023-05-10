import express from "express";
import { getBanner, createBanner, updateBanner, deleteBanner } from "../controllers/banner.js";
const router = express.Router();

// http://localhost:5000/products

router.get("/", getBanner);
router.post("/", createBanner);
router.patch("/:id", updateBanner);
router.delete("/:id", deleteBanner);
export default router;