import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import methodOverride from "method-override";
import session from "express-session";
import MongoStore from "connect-mongo";
import indexRoutes from "./routes/index.js";
import journalRoutes from "./routes/journal.js";
import entryRoutes from "./routes/entries.js";
import userRoutes from "./routes/users.js";

const PORT = process.env.PORT || "3000";
const MONGODB_URI = process.env.MONGODB_URI;
const app = express();

//MiddleWare
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.use("/", indexRoutes);
    app.use("/journals", journalRoutes);
    app.use("/entries", entryRoutes);
    app.use("/auth", userRoutes);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

//Routes

// app.use("/", router);

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});
