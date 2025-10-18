import mongoose from "mongoose";

let cached = global.mongooseCache || (global.mongooseCache = { conn: null, promise: null });

export default async function mongodb() {
  const MONGO_URL = process.env.MONGO_URL || process.env.MONGODB_URI;
  if (!MONGO_URL) {
    throw new Error("Missing MONGO_URL / MONGODB_URI environment variable.");
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URL, {
        // options for newer mongoose versions; adjust if needed
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        // useUnifiedTopology and useNewUrlParser are defaults in modern mongoose
      })
      .then((m) => {
        return m.connection;
      });
  }

  try {
    cached.conn = await cached.promise;
    console.log("Mongo connected");
    return cached.conn;
  } catch (err) {
    // allow retries on subsequent invocations
    cached.promise = null;
    console.error("Mongo connection error:", err);
    throw err;
  }
}