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
  getAllUsers,
  profilePhotoController,
} from "../controllers/AuthController.js";
import AuthCheckmiddlewrer from "../middlewares/checkAuth.js";
import { profilePhoto } from "../utils/multer.js";

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
router.use(AuthCheckmiddlewrer);
router.get("/me", meController);
router.post("/profile-photo/:id", profilePhoto, profilePhotoController);
router.get("/user/all", getAllUsers);
export default router;
