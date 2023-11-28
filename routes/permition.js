import express from "express";
import { verifyToken } from "../middlewares/verfiyToken.js";
import {
  permitonController,
  allpermitonController,
  singlepermitonController,
  singlepermitonAndDeleteController,
  permitionUpdate,
  permitionStatusUpdate,
  permitionDeletecontroller,
} from "../controllers/permitonController.js";
import { Getalluser } from "../controllers/AuthController.js";

/// router
const router = express.Router();

///

router.get("/permition", verifyToken, allpermitonController);
router.post("/permition", verifyToken, permitonController);
router.get("/permition/:id", verifyToken, singlepermitonController);
router.delete("/permition/:id", verifyToken, singlepermitonAndDeleteController);
router.put("/permition/:id", verifyToken, permitionUpdate);
router.put("/permition/status/:id", verifyToken, permitionStatusUpdate);
// router.put("/permition/:id", verifyToken, permitionDeletecontroller);

//get all users

router.get("/allusers", Getalluser);

export default router;
