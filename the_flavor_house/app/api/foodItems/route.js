import connectDB from "@/app/libs/db";
import FoodItem from "@/app/models/foodItemModel";
import Category from "@/app/models/categoryModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const foodItems = await FoodItem.find().populate("category");
    return NextResponse.json(foodItems);
  } catch (e) {
    console.error("Error fetching food items:", e);
    return NextResponse.json(
      { message: "Failed to fetch food items", error: e.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const { name, price, category, image } = await req.json();

    // Validate required fields
    if (!name || !name.trim()) {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 }
      );
    }

    if (!price || price <= 0) {
      return NextResponse.json(
        { message: "Valid price is required" },
        { status: 400 }
      );
    }

    if (!category || !category.trim()) {
      return NextResponse.json(
        { message: "Category is required" },
        { status: 400 }
      );
    }

    if (!image || !image.trim()) {
      return NextResponse.json(
        { message: "Image is required" },
        { status: 400 }
      );
    }

    // Find category by name to get ObjectId
    const categoryDoc = await Category.findOne({ name: category });
    if (!categoryDoc) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 400 }
      );
    }

    const existingItem = await FoodItem.findOne({ name });
    if (existingItem) {
      return NextResponse.json(
        {
          message: "Item already exists",
        },
        { status: 400 }
      );
    }

    const newItems = new FoodItem({
      name,
      price,
      category: categoryDoc._id, // Use ObjectId instead of string
      image,
    });
    await newItems.save();
    return NextResponse.json(newItems, { status: 201 });
  } catch (e) {
    console.error("API Error:", e);
    console.error("Stack trace:", e.stack);
    return NextResponse.json(
      {
        message: "Failed to create food item",
        error: e.message,
        stack: process.env.NODE_ENV === "development" ? e.stack : undefined,
      },
      { status: 500 }
    );
  }
}
