import mongoose from "mongoose";
import { email } from "zod";

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  role: {
    type: String,
    enum: ["admin", "waiter","manager"],
    default: "waiter",
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
