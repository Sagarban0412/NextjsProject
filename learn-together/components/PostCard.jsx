import { Forward, MessageCircle, ThumbsUp } from "lucide-react";
import Image from "next/image";
import React from "react";

const PostCard = ({ title, description, authorName, userProfile, media }) => {
  //   console.log(authorName);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 max-w-[1200px] ">
      {/* user info */}
      <div className="flex gap-3 items-center mb-4">
        <Image
          src={userProfile || ""}
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full w-10 h-10 sm:w-12 sm:h-12"
        />
        <div>
          <h1 className="font-semibold text-sm sm:text-base">{authorName}</h1>
          <p className="text-gray-500 text-xs sm:text-sm">2 hour ago</p>
        </div>
      </div>
      {/* media part */}
      <div className="w-full relative h-48 sm:h-64 md:h-[700px] rounded-lg mb-3">
        {media.map((item, index) => (
          <Image
            key={index}
            src={item.url}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
            alt="images-1"
            className="object-cover rounded-lg"
          />
        ))}
      </div>
      <div className="mb-4">
        <h3 className="text-sm sm:text-base font-medium mb-1">{title}</h3>
        <p className="line-clamp-2 text-xs sm:text-sm text-gray-600">{description}</p>
      </div>
      <div className="flex justify-between text-gray-600">
        <div className="flex items-center gap-1 sm:gap-2 cursor-pointer hover:text-blue-600">
          <ThumbsUp size={16} className="sm:w-5 sm:h-5" />
          <p className="text-xs sm:text-sm">Like</p>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 cursor-pointer hover:text-blue-600">
          <MessageCircle size={16} className="sm:w-5 sm:h-5" />
          <p className="text-xs sm:text-sm">Comment</p>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 cursor-pointer hover:text-blue-600">
          <Forward size={16} className="sm:w-5 sm:h-5" />
          <p className="text-xs sm:text-sm">Share</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
