import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    authorId: {
      type: String,
      required: false,
    },
    courseTitle: {
      type: String,
      required: true,
    },
    courseDescription: {
      type: String,
      required: true,
    },
    media: [
      {
        id: { type: String },
        type: { type: String, enum: ["image", "video", "pdf"] }, // ✅ fixed enum syntax
        url: { type: String },
        thumbnailUrl: { type: String },
        size: { type: Number },
      },
    ],
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
    likesCount: {
      type: Number,
      default: 0, // ✅ best practice: give default values
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
    sharesCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true } // ✅ adds createdAt and updatedAt automatically
);

// ✅ Correct model initialization
const Posts = mongoose.models.Posts || mongoose.model("Posts", postSchema);

export default Posts;
