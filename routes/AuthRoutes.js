import { Router } from "express";
import {
  UserLogin,
  UserLogout,
  UserRegister,
  VerfiyUser,
  VerfiyUserByOtp,
  meController,
  ResendAcivation,
  ResendPasswordLink,
  VerfiyUserTokenPassword,
} from "../controllers/AuthController.js";

const router = Router();

router.post("/login", UserLogin);
router.post("/resetpassword", ResendPasswordLink);
router.post("/resetpassword/:token", VerfiyUserTokenPassword);
// router.post("/resetpasswordverify", UserResetPasswordverify);
router.post("/register", UserRegister);
router.post("/activation/:token", VerfiyUser);
router.post("/activation-by-otp/:token", VerfiyUserByOtp);
router.post("/resend-activation", ResendAcivation);
router.get("/logout", UserLogout);
router.get("/me", meController);
// router.get("/user/all", Getalluser);

export default router;
