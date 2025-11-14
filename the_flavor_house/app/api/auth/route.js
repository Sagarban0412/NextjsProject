import { loginUser } from "@/app/controllers/authController";
import connectDB from "@/app/libs/db";
import User from "@/app/models/userModel";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const users = await User.find().select("-password"); // exclude passwords
  return NextResponse.json({ message: "API is working", users });
}

export async function POST(request) {
  try {
    await connectDB();

    const { userName, password } = await request.json();

    // loginUser will throw on errors (user not found, invalid credentials, etc.)
    const { user, token } = await loginUser(userName, password);


    // Option B — set token as an httpOnly cookie (safer for many apps)
    const res = NextResponse.json({ user,token }, { status: 200 });
    res.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60, // 1 hour
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    return res;

  } catch (error) {
    // Map common errors to status codes
    const message = error?.message || "Something went wrong";
    const status = message === "User not found" || message === "Invalid credentials" ? 401 : 400;

    return NextResponse.json({ error: message }, { status });
  }
}
