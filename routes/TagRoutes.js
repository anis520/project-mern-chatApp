import express from "express";
import {
  CreateTag,
  DeleteTag,
  GetallTag,
  TagStatusUpdate,
} from "../controllers/TagController.js";

const router = express.Router();

// create route

router.route("/tag").get(GetallTag).post(CreateTag);

router.route("/tag/:id").delete(DeleteTag).put(TagStatusUpdate);

export default router;
