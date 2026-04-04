import { Router } from "express";
import {
  signinUser,
  signupUser,
  signoutUser,
  verifyEmailToken,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/signup", signupUser);
router.post("/signin", signinUser);
router.post("/signout", signoutUser);
router.get("/verify-email", verifyEmailToken);




export default router;
