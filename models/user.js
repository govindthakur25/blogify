import { createHmac, randomBytes } from "node:crypto";
import { Schema, model } from "mongoose";

const userSchema = Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: "/images/default.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;
  next();
});

userSchema.static("matchPassword", async function (email, password) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Email is not registered!");
  const { salt, password: storedPassword } = user;
  const hashIncomingPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");
  if (hashIncomingPassword !== storedPassword)
    throw new Error("Incorrect username or password!");

  return { user };
});

const User = model("user", userSchema);

export { User };
