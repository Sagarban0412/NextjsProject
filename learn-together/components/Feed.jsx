"use client";

import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import axios from "axios";
import { set } from "mongoose";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts");
        console.log(response.data.posts);
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);
  return (
    <>
      {/* Content Feed Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Latest Learning Content
            </h2>
            <p className="text-gray-600">
              Discover new courses, resources, and updates from our community
            </p>
          </div>
        </div>
        <div className="max-w-full flex flex-col items-center justify-center gap-5">
          {posts.map((post, index) => (
            <div key={index} className="min-w-[300px] flex flex-col items-center justify-center ">
                <PostCard title={post.courseTitle} description={post.courseDescription} authorName={post.authorName} userProfile={post.imgUrl} media={post.media}/>
                <hr className="mt-10" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Feed;
