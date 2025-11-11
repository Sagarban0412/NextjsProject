import User from "@/app/models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const loginUser = async (userName, password) => {
  // Basic validation
  if (!userName || !password) {
    throw new Error("Missing userName or password");
  }

  // Find user
  const user = await User.findOne({ userName: userName });
  if (!user) {
    // throw so caller can return appropriate HTTP response
    throw new Error("User not found");
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  // Ensure JWT secret exists
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not set in env");
  }

  // Create token
  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // Don't return the password hash
  const userObj = user.toObject ? user.toObject() : { ...user };
  delete userObj.password;

  return { user: userObj, token };
};
