"use client";

import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Eye, Share2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  thumbnail: string;
  title: string;
  likes: number;
  content: string;
  link: string;
  date: string;
  name: string;
  userName: string;
  userImage: string;
}

const BlogCard = ({
  thumbnail,
  title,
  likes,
  content,
  link,
  date,
  name,
  userName,
  userImage,
}: BlogCardProps) => {
  const [like, setLike] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Jayma Bio Innovations",
          text: "Check out this blog!",
          url: "https://jaymabioinnovations.com",
        });
        toast("Link shared successfully");
      } catch (error) {
        toast("Error sharing the link");
      }
    } else {
      window.navigator.clipboard.writeText("https://jaymabioinnovations.com");
      toast("Link copied to clipboard");
    }
  };

  return (
    <div className="flex flex-col md:flex-row border shadow-md rounded-lg">
      <div className="w-full md:w-2/5 h-full">
        <img
          src={thumbnail}
          alt={title}
          className="rounded-t-lg md:rounded-l-lg md:rounded-t-none object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col justify-between px-10 py-5 w-full md:w-3/5">
        <div className="space-y-4">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center gap-2">
              <img
                src={userImage}
                alt={name}
                className="rounded-full w-12 h-12"
              />
              <p className="font-extralight text-sm">{name}</p>
              <p className="font-extralight text-sm">@{userName}</p>
              <p className="font-extralight text-sm">{formatDate(date, 1)}</p>
            </div>
            <button onClick={handleShare}>
              <Share2 size={24} />
            </button>
          </div>
          <div className="space-y-3 w-full">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="font-extralight text-sm">{content}</p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-4">
            <div className="flex flex-row items-center">
              <button onClick={() => setLike(!like)}>
                <img
                  src={
                    !like
                      ? "/landing/blogs/heart.png"
                      : "/landing/blogs/filled-heart.png"
                  }
                  alt="likes"
                  className="w-6 h-6 mr-2"
                />
              </button>
              <p className="text-xl">{likes}</p>
            </div>
            <div className="flex flex-row items-center">
              <IoEyeOutline className="w-8 h-8 mr-2" />
              <p className="text-xl">{10}</p>
            </div>
          </div>
          <Link href={link}>
            <Button className="bg-green">Read More</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
