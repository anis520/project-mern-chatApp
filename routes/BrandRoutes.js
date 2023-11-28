import express from "express";
import {
  CreateBrand,
  DeleteBrand,
  GetallBrand,
  UpdateBrand,
} from "../controllers/BrandController.js";
import { BrandLogoUpload } from "../utils/multer.js";
const router = express.Router();

// create route

router.route("/brand").get(GetallBrand).post(BrandLogoUpload, CreateBrand);

router
  .route("/brand/:id")
  .put(BrandLogoUpload, UpdateBrand)
  .delete(DeleteBrand);

export default router;
