import { Router } from "express";
import {
  signinUser,
  signupUser,
  signoutUser,
  verifyEmailToken,
  refreshHandler,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/signup", signupUser);
router.post("/signin", signinUser);
router.post("/signout", signoutUser);
router.get("/verify-email", verifyEmailToken);
router.post("/refresh-token", refreshHandler);

export default router;

//1:21:33
