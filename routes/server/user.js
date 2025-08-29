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
  const user = await User.findOne({
    email,
  });
  if (!user) {
    res.redirect("/user/signup", { error: "Email is not registered!" });
  }
  const { salt } = user;
  const hashIncomingPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");
  if (hashIncomingPassword !== user.password) {
    res.redirect("/user/signin", { error: "Incorrect username or password!" });
  }
  // assign JWT token
  res.redirect("/");
});

export { userRoute };
