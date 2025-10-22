import { Forward, MessageCircle, ThumbsUp } from "lucide-react";
import Image from "next/image";
import React from "react";

const PostCard = ({ title, description, authorName, userProfile, media }) => {
  //   console.log(authorName);

  return (
    <>
      <div>
        {/* user info */}
        <div className="flex gap-2 items-center">
          <Image
            src={userProfile || ""}
            alt="Profile"
            width={60}
            height={60}
            className="rounded-full "
          />
          <div className="leading-3.5">
            <h1 className="font-semibold text-lg leading-3.5">{authorName}</h1>
            <p className="font-light text-sm leading-6">2 hour ago</p>
          </div>
        </div>
        {/* media part */}
        <div className="w-full relative h-[600px] rounded-xl">
          {media.map((item, index) => (
            <Image
              key={index}
              src={item.url}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
              alt="images-1"
              className="object-cover rounded-xl"
            />
          ))}
        </div>
        <div className="mb-5 mt-3">
          <h3 className="text-lg font-sans font-medium">{title}</h3>
          <p className="line-clamp-1 text-sm font-sans">{description}</p>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <ThumbsUp />
            <p>Like</p>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle />
            <p>Comment</p>
          </div>
          <div className="flex items-center gap-2">
            <Forward />
            <p>Share</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
