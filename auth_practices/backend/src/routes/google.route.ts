import { Router } from "express";
import {
  googleAuthCallbackHandler,
  googleAuthStartHandler,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/google", googleAuthStartHandler);
router.get("/google/callback", googleAuthCallbackHandler);

export default router;
