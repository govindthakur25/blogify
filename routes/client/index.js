import express from "express";

const clientRoute = express.Router();

clientRoute.get("/", (req, res) => res.render("home"));
clientRoute.get("/signup", (req, res) => {
  res.render("signup");
});
clientRoute.get("/signin", (req, res) => {
  res.render("signin");
});

export { clientRoute };
