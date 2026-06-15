import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  changeUserAvatar,
  refreshTokens,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import varifyJWT from "../middlewares/varifyJWT.js";

const router = Router();

router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/login").post(upload.none(), loginUser);
router.route("/logout").post(upload.none(), varifyJWT, logoutUser);
router
  .route("/change-avatar")
  .post(upload.single("avatar"), varifyJWT, changeUserAvatar);
router.route("/refreshTokens").post(upload.none(), varifyJWT, refreshTokens);

export default router;
