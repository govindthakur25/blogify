import express from "express";

const clientRoute = express.Router();

clientRoute.get("/user", (req, res) => {
  res.render("home");
});
clientRoute.get("/user/signup", (req, res) => {
  res.render("signup");
});
clientRoute.get("/user/signin", (req, res) => {
  res.render("signin");
});
clientRoute.get("/blog/add-blog", (req, res) => {
  res.render("addBlog");
});

export { clientRoute };
