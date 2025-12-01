import connectDB from "@/app/libs/db";
import FoodItem from "@/app/models/foodItemModel";
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
