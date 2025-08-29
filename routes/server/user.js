import { createHmac, randomBytes } from "node:crypto";

import express from "express";
import { User } from "../../models/user.js";
const userRoute = express.Router();

userRoute.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  });
  res.redirect("/");
});

userRoute.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.matchPassword(email, password);
  console.log({ user });
  // assign JWT token
  res.redirect("/");
});

export { userRoute };
