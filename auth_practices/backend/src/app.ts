import cookieParser from "cookie-parser";
import express from "express";
import userRouter from "./routes/user.route.js";
import { isUserAdmin } from "./middlewares/isUserAdmin.js";
import { isUserAuthenticated } from "./middlewares/isUserAuthenticated.js";

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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

export default app;
