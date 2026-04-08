import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";
import { connectRedis } from "./config/redis.js";

const PORT = env.PORT;

async function startServer() {
  try {
    await connectRedis();
    await connectDB();

    const { default: app } = await import("./app.js");
    app.listen(PORT, () => {
      console.log(`Server started at PORT: ${PORT}`);
    });
  } catch (error) {
    console.error("Startup failed:", error);
    process.exit(1); // important
  }
}

startServer();
