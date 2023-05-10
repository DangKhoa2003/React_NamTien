import express from "express";
import { getVideo, createVideo, updateVideo, deleteVideo } from "../controllers/video.js";
const router = express.Router();

// http://localhost:5000/products

router.get("/", getVideo);
router.post("/", createVideo);
router.patch("/:id", updateVideo);
router.delete("/:id", deleteVideo);
export default router;