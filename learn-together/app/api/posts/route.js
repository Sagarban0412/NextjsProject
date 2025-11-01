import Post from "@/models/postModel";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const posts = await Post.find().sort({ createdAt: -1 }); // optional: newest first

    return NextResponse.json({ success: true, posts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch posts",
        error: error.message,
      },
      { status: 500 }
    );
  }
}