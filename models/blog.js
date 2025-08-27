import { Schema, model } from "mongoose";

const blogSchema = Schema(
  {
    title: {
      type: String,
    },
    body: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    createBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  },
  { timestamps: true }
);

const Blog = model("blog", blogSchema);

export { Blog };
