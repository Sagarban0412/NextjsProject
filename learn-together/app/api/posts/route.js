import Posts from "@/models/postModel";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();

  try {
    const { title, description } = await req.json();

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    const post = await Posts.create({
      courseTitle: title,
      courseDescription: description,
    });

    return NextResponse.json(
      {
        message: "Post created successfully",
        post,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


