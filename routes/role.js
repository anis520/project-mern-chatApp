import express from "express";
import { verifyToken } from "../middlewares/verfiyToken.js";
import {
  allroleController,
  roleController,
  singleroleAndDeleteController,
  singleroleUpdateController,
  roleStatusUpdate,
} from "../controllers/roleController.js";

/// router
const router = express.Router();

///

router.post("/role", verifyToken, roleController);
router.get("/role", verifyToken, allroleController);
router.delete("/role/:id", verifyToken, singleroleAndDeleteController);
router.put("/role/:id", verifyToken, singleroleUpdateController);
router.put("/role/status/:id", verifyToken, roleStatusUpdate);

// router.get("/permition/:id", verifyToken, singlepermitonController);

export default router;
