import { Router } from "express";
import { SignupUser } from "../controllers/user.controller.js";

const router = Router();

router.post("/signup", SignupUser);

export default router;
