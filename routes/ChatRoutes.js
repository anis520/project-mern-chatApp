import { Router } from "express";
import {
  ChatCreate,
  GetAllChats,
  updateChat,
} from "../controllers/ChatController.js";
import { ChatPhotoUpload } from "../utils/multer.js";

const router = Router();

router.post("/chat", ChatPhotoUpload, ChatCreate);
router.get("/getChatByUser/:id", GetAllChats);
router.put("/updateChat/:id", updateChat);

export default router;
