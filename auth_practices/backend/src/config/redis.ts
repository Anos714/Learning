import { createClient } from "redis";

const client = createClient({
  url: "redis://localhost:6379",
});

client.on("error", (err) => {
  console.log("Redis Error:", err);
});

export async function connectRedis() {
  await client.connect();
  console.log("Redis connected");
}

export default client;
