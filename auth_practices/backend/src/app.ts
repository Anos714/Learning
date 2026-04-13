import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import googleRouter from "./routes/google.route.js";
import { isUserAdmin } from "./middlewares/isUserAdmin.js";
import { isUserAuthenticated } from "./middlewares/isUserAuthenticated.js";
import { globalLimiter } from "./middlewares/rateLimit.middleware.js";

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  }),
);
app.use(globalLimiter);

//health checkup of api
app.use("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});

//auth check test route
app.use("/auth-check", isUserAuthenticated, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Auth user page",
  });
});

//admin only test route
app.use("/admin", isUserAuthenticated, isUserAdmin, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Admin page",
  });
});

app.use("/api/user", userRouter);
app.use("/auth", googleRouter);

export default app;
