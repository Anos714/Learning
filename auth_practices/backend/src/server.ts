import app from "./app.js";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";

const PORT = env.PORT;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    throw new Error("Database connection failed", error);
  });
