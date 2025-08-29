import express from "express";
import path from "path";
import mongoose from "mongoose";

import { clientRoute } from "./routes/client/index.js";
import { userRoute } from "./routes/server/user.js";
import { blogRoute } from "./routes/server/blog.js";

const app = express();
const PORT = 8888;
mongoose
  .connect("mongodb://localhost:27017/blogify")
  .then(() => console.log("Mongo DB connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: true }));

app.use("/", clientRoute);
app.use("/api/user", userRoute);
app.use("api/blog", blogRoute);

app.listen(PORT, () => console.log("Server started at port:", PORT));
