import { Router } from "express";
import {
  alluser,
  crateuser,
  deleteuser,
} from "../controllers/PublicController.js";
import AuthCheckmiddlewrer from "../middlewares/checkAuth.js";

const router = Router();
// router.use(AuthCheckmiddlewrer);
router.post("/", crateuser);

router.get("/", alluser);

router.delete("/user/:id", deleteuser);

export default router;
