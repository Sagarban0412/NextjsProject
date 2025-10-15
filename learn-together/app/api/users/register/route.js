import User from "@/models/userModel";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const user = await User.find();
  return NextResponse.json({ message: "✅ MongoDB Connected", user: user });
}

export async function POST(request) {
  await connectDB();
  const { name, email, password, role } = await request.json();
  const user = await User.create({ name, email, password, role });
  return NextResponse.json({ message: "✅ User Created", user: user });
}
