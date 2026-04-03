import cookieParser from "cookie-parser";
import express from "express";
import userRouter from "./routes/user.route.js";

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});

app.use("/api/user", userRouter);

export default app;
