import express from "express";
import dotenv from "dotenv";
dotenv.config();
import methodOverride from "method-override";
import morgan from "morgan";
import mongoose from "mongoose";
import router from "./routes/index.js";

const PORT = process.env.PORT || "3000";
const app = express();

//MiddleWare
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

//Routes

app.use("/", router);

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});
