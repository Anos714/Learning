import { Router } from "express";
import {
  signinUser,
  signupUser,
  signoutUser,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/signup", signupUser);
router.post("/signin", signinUser);
router.post("/signout", signoutUser);

export default router;
