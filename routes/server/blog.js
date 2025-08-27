import express from "express";

const blogRoute = express.Router();

blogRoute.get("/add-blog", (req, res) => {
  res.render("addBlog");
});

export { blogRoute };
