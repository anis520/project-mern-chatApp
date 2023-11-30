import { Router } from "express";
import {
  UserLogin,
  UserRegister,
  VerfiyUser,
  VerfiyUserByOtp,
} from "../controllers/AuthController.js";

const router = Router();

router.post("/login", UserLogin);
// router.post("/resetpassword", UserResetPassword);
// router.post("/resetpasswordverify", UserResetPasswordverify);
router.post("/register", UserRegister);
router.post("/activation/:token", VerfiyUser);
router.post("/activation-by-otp/:token", VerfiyUserByOtp);
// router.get("/logout", UserLogout);
// router.get("/me", meController);
// router.get("/user/all", Getalluser);

export default router;
