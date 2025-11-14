// app/api/users/route.js
import connectDB from "@/app/libs/db";
import { NextResponse } from "next/server";
import { createUser } from "@/app/controllers/userController"; // adjust path to where you put createUser

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { userName, password, role } = body ?? {};

    // Basic validation
    if (!userName || !password) {
      return NextResponse.json(
        { error: "userName and password are required" },
        { status: 400 }
      );
    }

    // Create user (createUser throws on conflict)
    const user = await createUser(userName.trim(), password, role ?? "user");

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
