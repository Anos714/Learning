import { Router } from "express";
import {
  signinUser,
  signupUser,
  signoutUser,
  verifyEmailToken,
  refreshHandler,
  requestPasswordReset,
  resetPasswordHandler,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/signup", signupUser);
router.post("/signin", signinUser);
router.post("/signout", signoutUser);
router.get("/verify-email", verifyEmailToken);
router.post("/refresh-token", refreshHandler);
router.post("/request-password-reset", requestPasswordReset);
router.post("/reset-password", resetPasswordHandler);

export default router;

//1:50:38
