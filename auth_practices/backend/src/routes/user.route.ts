import { Router } from "express";
import { loginUser, SignupUser } from "../controllers/user.controller.js";

const router = Router();

router.post("/signup", SignupUser);
router.post("/login", loginUser);

export default router;
