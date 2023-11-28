import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getallProduct,
} from "../controllers/ProductController.js";
import { ProductPhotoUpload } from "../utils/multer.js";

const router = Router();

/// product router

// router.use(AuthCheckmiddlewrer);
router.post("/product", ProductPhotoUpload, createProduct);
router.get("/product", getallProduct);
router.delete("/product/:id", deleteProduct);

export default router;
