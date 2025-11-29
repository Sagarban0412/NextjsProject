import connectDB from "@/app/libs/db";
import FoodItem from "@/app/models/foodItemModel";
import Category from "@/app/models/categoryModel";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        await connectDB()
        const foodItems = await FoodItem.find();
        return NextResponse.json(foodItems)
    }catch(e){

    }
}

export async function POST(req) {
  try {
    await connectDB();
    const { name, price, category, image } = await req.json();
    
    console.log("Received data:", { name, price, category, image });
    
    if (!name || !price || !category || !image) {
      return NextResponse.json(
        {
          message: "All fields are required",
          received: { name: !!name, price: !!price, category: !!category, image: !!image }
        },
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
        stack: process.env.NODE_ENV === 'development' ? e.stack : undefined
      },
      { status: 500 }
    );
  }
}
