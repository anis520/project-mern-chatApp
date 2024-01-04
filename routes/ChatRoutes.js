import { Router } from "express";
import { ChatCreate, GetAllChats } from "../controllers/ChatController.js";

const router = Router();

router.post("/chat", ChatCreate);
router.get("/getChatByUser/:id", GetAllChats);

export default router;
