import mongoose from "mongoose";

//This is AI assistant generated code to improve database connection handling in a serverless environment like Vercel.
const MONGO_URL = process.env.MONGO_URL;
if (!MONGO_URL) {
  throw new Error("Missing MONGO_URL environment variable. Add it to .env.local and Vercel project settings.");
}

// Cache the connection across lambda invocations (prevents connection storms on Vercel)
let cached = global.mongooseCache || (global.mongooseCache = { conn: null, promise: null });

export default async function mongodb() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URL, {
        // keep options minimal to support multiple Mongoose versions
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        // additional options can be passed here if needed
      })
      .then((m) => m.connection);
  }

  cached.conn = await cached.promise;
  console.log("Mongo connected");
  return cached.conn;
}
