import { connectDB } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import mongoose from "mongoose";

export async function GET(){
    await connectDB()

    const user = useUser();

    console.log(user);
    
}