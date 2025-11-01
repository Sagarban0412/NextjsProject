"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import { toast } from "react-toastify";

const ManagePostCard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get("/api/posts");
        setPosts(res.data.posts || []);
      } catch (err) {
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);

  const handleUpdate = (id) => {
    console.log(id);
  };
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    
    try {
      await axios.delete(`/api/posts/${id}`);
      setPosts(posts.filter(post => post._id !== id));
      toast.success("Post deleted successfully");
    } catch (error) {
      toast.error("Failed to delete post");
    }
  };
  if (loading)
    return (
      <div className="p-6 text-center text-gray-600">Loading posts...</div>
    );
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <>
      <h1 className="text-center text-sm lg:text-lg underline font-medium">
        List of Posts
      </h1>
      <div className="py-6  rounded-lg shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className={"text-right"}>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <TableRow key={post._id || index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{post.courseTitle}</TableCell>
                  <TableCell className="max-w-50 truncate">
                    {post.courseDescription}
                  </TableCell>
                  <TableCell className="flex justify-end items-end gap-3 ">
                    <Button
                      className=" cursor-pointer "
                      variant={"outline"}
                      onClick={() => handleUpdate(post._id)}
                    >
                      Update
                    </Button>

                    <Button
                      variant="destructive"
                      className="cursor-pointer text-white"
                      onClick={() => handleDelete(post._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan="4"
                  className="text-center py-4 text-gray-600"
                >
                  No posts found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ManagePostCard;
