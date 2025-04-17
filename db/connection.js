import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

// You have diplicate mongoose.connects one here and one in the server.js
// Keep this one - get rid of the one in the server.js
mongoose.connect(process.env.MONGODB_URI).then(
  () => console.log("Connected to MongoDB"),
  (err) => console.error(err)
);
