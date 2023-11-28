import express from "express";
import {
  CreateCatagroy,
  DeleteCatagory,
  GetallCatagory,
  UpdateCatagroy,
} from "../controllers/CatagoryController.js";
import { CatagoryPhotoUpload } from "../utils/multer.js";

const router = express.Router();

// create route

router
  .route("/catagory")
  .post(CatagoryPhotoUpload, CreateCatagroy)
  .get(GetallCatagory);

router
  .route("/catagory/:id")
  .delete(DeleteCatagory)
  .put(CatagoryPhotoUpload, UpdateCatagroy);

export default router;
