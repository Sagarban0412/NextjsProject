// app/api/users/route.js
import connectDB from "@/app/libs/db";
import { NextResponse } from "next/server";
import { createUser } from "@/app/controllers/userController"; // adjust path to where you put createUser
import bcrypt from "bcryptjs";
import User from "@/app/models/userModel";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    // console.log("Received Data from frontend:",body);
    
    const { userName, email,password, role } = body ?? {};

    // Basic validation
    if (!userName || !password) {
      return NextResponse.json(
        { error: "userName and password are required" },
        { status: 400 }
      );
    }

    // Create user (createUser throws on conflict)
    const user = await createUser(userName.trim(),email, password, role ?? "user");

    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 201 }
    );
  } catch (error) {
    // If createUser threw with a .status, use it
    const status = error?.status ?? 500;
    console.error("POST /api/users error:", error?.message ?? error);
    return NextResponse.json({ error: error?.message ?? "Internal server error" }, { status });
  }
}

export async function GET(request){
  try {
    await connectDB();
    const users = await User.find();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("GET /api/users error:", error);
    return NextResponse.json(
      { error: error?.message ?? "Failed to fetch users" },
      { status: 500 }
    );
  }
}