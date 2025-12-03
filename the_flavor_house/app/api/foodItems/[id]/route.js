import connectDB from "@/app/libs/db";
import FoodItem from "@/app/models/foodItemModel";
import Category from "@/app/models/categoryModel";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const foodExist = await FoodItem.findById(id);
    if (!foodExist) {
      return NextResponse.json({ message: "Items not Found" }, { status: 400 });
    }

    const foodItem = await FoodItem.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Items Deleted Successfully!!",
      foodItem,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const { name, price, category, image } = await request.json();

    // Find category by name to get ObjectId
    const categoryDoc = await Category.findOne({ name: category });
    if (!categoryDoc) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 400 }
      );
    }

    const updatedItem = await FoodItem.findByIdAndUpdate(
      id,
      {
        name,
        price,
        category: categoryDoc._id,
        image,
      },
      { new: true }
    ).populate('category');

    if (!updatedItem) {
      return NextResponse.json(
        { message: "Food item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error) {
    console.error("Error updating food item:", error);
    return NextResponse.json(
      { message: "Failed to update food item", error: error.message },
      { status: 500 }
    );
  }
}
