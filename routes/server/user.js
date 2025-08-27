import express from "express";

const userRoute = express.Router();

userRoute.get("/signup", (req, res) => {
  res.render("signup");
});

userRoute.get("/signin", (req, res) => {
  res.render("signin");
});

export { userRoute };
