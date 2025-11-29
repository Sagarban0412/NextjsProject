import connectDB from "@/app/libs/db";
import Category from "@/app/models/categoryModel";
import { NextResponse } from 'next/server'; // Import NextResponse for better error handling

/**
 * Handles POST requests to create a new Category.
 * @param {Request} req The incoming request object provided by Next.js.
 */
export async function POST(req) { 
    try{
        await connectDB();
        
        const { name, slug } = await req.json(); 

        if (!name || !slug) {
            return NextResponse.json({ message: "Name and slug are required." }, { status: 400 });
        }
        const category = await Category.create({ name, slug });
       
        return NextResponse.json(category, { status: 201 });
    } catch(e) {
        console.error("Failed to create category:", e);
        
        // ISSUE 5: Return an error response in the catch block
        return NextResponse.json({ 
            message: "Failed to create category",
            error: e.message 
        }, { status: 500 });
    }
}

export async function GET() {
    await connectDB();
    const categories = await Category.find();
    return NextResponse.json(categories);
}