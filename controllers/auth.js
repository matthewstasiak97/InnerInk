import { Router } from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";

const router = Router();

export const getSignUp = (req, res) => {
  res.render("auth/sign-up");
};

export const getSignIn = (req, res) => {
  res.render("auth/sign-in");
};

export const registerUser = async (req, res) => {
  try {
    if (req.body.password !== req.body.confirmPassword) {
      return res.send("Password and Confirm Password must match");
    }

    const userInDB = await User.findOne({ username: req.body.username });
    if (userInDB) {
      return res.send("Username already taken");
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    const user = await User.create({
      email: req.body.email,
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
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error during registration.");
  }
};

export const loginUser = async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username });
  if (!userInDatabase) {
    return res.send("Login failed. Please try again.");
  }

  const validPassword = bcrypt.compareSync(
    req.body.password,
    userInDatabase.password
  );

  if (!validPassword) {
    return res.send("Login failed. Please try again");
  }

  req.session.user = {
    _id: userInDatabase._id,
    username: userInDatabase.username,
  };

  req.session.save(() => {
    res.redirect("/");
  });
};

export const signOutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

router.get("/", (req, res) => {
  res.render("index");
});

export default router;
