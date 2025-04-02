import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

mongoose.connect(process.env.MONGODB_URI).then(
  () => console.log("Connected to MongoDB"),
  (err) => console.error(err)
);
