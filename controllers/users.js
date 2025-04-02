import { Router } from "express";
import User from "../models/user.js";

const usersRouter = Router();

usersRouter.get("/", (req, res) => {
  res.render("index");
});

export default usersRouter;
