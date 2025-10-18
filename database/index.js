import mongoose from 'mongoose';

export default async function mongodb() {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log("Mongo Connected")
}