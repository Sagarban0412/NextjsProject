import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "waiter"],
    default: "waiter",
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
