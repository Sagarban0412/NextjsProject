import Post from "@/models/postModel";
import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    
    await Post.findByIdAndDelete(id);
    
    return NextResponse.json(
      { success: true, message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete post",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

