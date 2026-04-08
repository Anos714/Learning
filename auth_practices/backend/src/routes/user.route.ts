import { Router } from "express";
import {
  signinUser,
  signupUser,
  signoutUser,
  verifyEmailToken,
  refreshHandler,
  requestPasswordReset,
  resetPasswordHandler,
  checkUserStatus,
} from "../controllers/user.controller.js";
import { isUserAuthenticated } from "../middlewares/isUserAuthenticated.js";
import {
  authLimiter,
  refreshLimiter,
  resetLimiter,
  verifyLimiter,
} from "../middlewares/rateLimit.middleware.js";

const router = Router();

router.post("/signup", authLimiter, signupUser);
router.post("/signin", authLimiter, signinUser);
router.post("/signout", refreshLimiter, signoutUser);
router.get("/verify-email", verifyLimiter, verifyEmailToken);
router.post("/refresh-token", refreshLimiter, refreshHandler);
router.post("/request-password-reset", resetLimiter, requestPasswordReset);
router.post("/reset-password", resetLimiter, resetPasswordHandler);
router.get("/me", refreshLimiter, isUserAuthenticated, checkUserStatus);

export default router;
