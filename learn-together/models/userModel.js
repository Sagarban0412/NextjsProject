import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    authorId: {
      type: String,
    },
    authorName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "teacher"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
