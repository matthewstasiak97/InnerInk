import { Router } from "express";
import User from "../models/user.js";

const router = Router();

// routes list

export const getSignUp = (req, res) => {
  res.render("auth/sign-up");
};

export const getSignIn = (req, res) => {
  res.render("auth/sign-in");
};

export const registerUser = async (req, res) => {
  if (req.body.password !== req.body.confirmPassword) {
    return res.send("Password and Confirm Password must match");
  }
};

const userInDB = await User.find({ username: req.body.username });
if (userInDB) {
  return res.send("Username already taken");
}

const hashedPassword = bcrypt.hashSync(req.body.username, 10);

const user = await User.create({
  username: req.body.username,
  password: hashedPassword,
});

req.session.user = {
  _id: user._id,
  username: user.username,
};

req.session.save(() => {
  res.redirect("/");
});

router.get("/", (req, res) => {
  res.render("index");
});

export default router;
