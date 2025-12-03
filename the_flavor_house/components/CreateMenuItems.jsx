import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import axios from "axios";
import { toast } from "react-toastify";

const CreateMenuItems = ({ setShowModal, onItemCreated, isUpdate, itemData }) => {
  
  const [preview, setPreview] = useState("");
  const [category, setCategory] = useState([]);

  const formSchema = z.object({
    name: z.string().min(3, "At least three characters"),
    category: z.string().min(1, "Select category"),
    price: z.number().min(1, "Price must be at least 1"),
    image: z.string().min(1, "Image is required"), // store Cloudinary URL here
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: itemData?.name || "",
      category: itemData?.category?.name || itemData?.category || "",
      price: itemData?.price || 0,
      image: itemData?.image || "",
    },
  });

  // -----------------------
  // CLOUDINARY UPLOAD
  // -----------------------
  const uploadToCloudinary = async (file) => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset);

    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await uploadRes.json();
    return data.secure_url;
  };

  const onSubmit = async (data) => {
    try {
      console.log("Submitting data:", data);
      
      if (isUpdate) {
        await axios.put(`/api/foodItems/${itemData._id}`, data);
        toast.success("Food Item Updated Successfully");
      } else {
        await axios.post("/api/foodItems", data);
        toast.success("Food Item Created Successfully");
      }
      
      setShowModal(false);
      if (onItemCreated) {
        onItemCreated();
      }
      
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = error.response?.data?.message || `Failed to ${isUpdate ? 'update' : 'create'} food item`;
      toast.error(errorMessage);
    }
  };

 useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get("/api/category");
        setCategory(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategory();
    
    // Set preview if updating with existing image
    if (isUpdate && itemData?.image) {
      setPreview(itemData.image);
    }
 }, [isUpdate, itemData]);
 

  return (
    <div className="bg-black/90 w-[800px] rounded-2xl">
      <div className="flex items-center justify-between p-5">
        <h1 className="font-medium text-2xl">{isUpdate ? 'Update' : 'Create'} Menu Items</h1>
        <X onClick={() => setShowModal(false)} size={40} />
      </div>

      <hr className="bg-gray-500" />

      <div className="p-5 flex flex-col gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Item Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Item Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full bg-black border border-gray-600 rounded-lg px-4 py-2"
                    >
                      <option value="">Select Category</option>
                      {category.map((cat,index)=>(
                        <option key={index} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Price"
                      value={field.value || ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? Number(e.target.value) : 0
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* File Upload + Cloudinary */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Menu Image</FormLabel>
                  <FormControl>
                    <div className="flex">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;

                          // preview
                          setPreview(URL.createObjectURL(file));

                          try {
                            // upload to cloudinary
                            const uploadedUrl = await uploadToCloudinary(file);

                            // set the Uploaded URL into form state
                            field.onChange(uploadedUrl);
                          } catch (error) {
                            console.error("Upload failed:", error);
                          }
                        }}
                      />

                      {/* IMAGE PREVIEW */}
                      {preview && (
                        <img
                          src={preview}
                          alt="Preview"
                          className="w-32 h-32 mt-3 rounded-lg object-cover border"
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <button
              type="submit"
              className="mt-6 bg-green-600 px-6 py-2 rounded-xl"
            >
              {isUpdate ? 'Update' : 'Create'}
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateMenuItems;
