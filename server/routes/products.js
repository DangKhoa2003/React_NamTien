import express from "express";

import {
  getProducts,
  createProducts,
  updateProducts,
  deleteProducts,
  likeProduct,
} from "../controllers/products.js";

const router = express.Router();

// http://localhost:5000/products

router.get("/", getProducts);
router.post("/", createProducts);
router.patch("/:id", updateProducts);
router.delete("/:id", deleteProducts);
router.patch("/:id/likeProduct", likeProduct);
export default router;
