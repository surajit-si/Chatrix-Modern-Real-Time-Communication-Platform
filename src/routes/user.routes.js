import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  changeUserAvatar,
  refreshTokens,
  sendOtpEmail,
  verifyOtp,
  reSendOtp,
  getUser,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import varifyJWT from "../middlewares/varifyJWT.js";

// Async handler wrapper to catch errors in async route handlers
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const router = Router();

router.route("/").get(upload.none(), varifyJWT, asyncHandler(getUser));
router.route("/register").post(upload.single("avatar"), asyncHandler(registerUser));
router.route("/login").post(upload.none(), asyncHandler(loginUser));
router.route("/logout").post(upload.none(), varifyJWT, asyncHandler(logoutUser));
router
  .route("/change-avatar")
  .post(upload.single("avatar"), varifyJWT, asyncHandler(changeUserAvatar));
router.route("/refreshTokens").post(upload.none(), varifyJWT, asyncHandler(refreshTokens));

router.route("/verify-email").get(upload.none(), varifyJWT, asyncHandler(sendOtpEmail));
router.route("/verify-otp").post(upload.none(), varifyJWT, asyncHandler(verifyOtp));
router.route("/resend-otp").get(upload.none(), varifyJWT, asyncHandler(reSendOtp));

export default router;
