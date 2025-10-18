import mongoose from "mongoose";

// This is AI Assistant generated code to improve database connection handling.
// Cache the connection across lambda invocations (prevents connection storms on Vercel)
let cached = global.mongooseCache || (global.mongooseCache = { conn: null, promise: null });

export default async function mongodb() {
  // check env at call time (not at module import)
  const MONGO_URL = process.env.MONGO_URL;
  if (!MONGO_URL) {
    throw new Error("Missing MONGO_URL environment variable. Add it to .env.local and Vercel project settings.");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URL, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
      })
      .then((m) => m.connection);
  }

  try {
    cached.conn = await cached.promise;
    console.log("Mongo connected");
    return cached.conn;
  } catch (err) {
    // clear promise so future invocations can retry
    cached.promise = null;
    console.error("Mongo connection error:", err);
    throw err;
  }
}
