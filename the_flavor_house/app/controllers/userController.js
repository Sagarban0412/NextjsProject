// app/services/userService.js
import User from "../models/userModel"; // adjust path
import bcrypt from "bcryptjs";

/**
 * Create a new user.
 * Throws an Error with status=409 if user already exists.
 * Returns the created user object without the password.
 */
export const createUser = async (userName,email, password, role = "user") => {
  try {
    // Check if user exists
    const existing = await User.findOne({ userName });
    if (existing) {
      const err = new Error("User already exists");
      err.status = 409;
      throw err;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    // Create and save
    const user = new User({
      userName,
      email,
      password: hashed,
      role,
    });

    await user.save();

    // Remove password before returning
    const userObj = user.toObject ? user.toObject() : { ...user };
    delete userObj.password;

    return userObj;
  } catch (error) {
    console.log("User creation failed:", error?.message ?? error);
    // re-throw so route handler can set the appropriate response
    throw error;
  }
};
