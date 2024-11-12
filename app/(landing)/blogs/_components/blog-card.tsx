"use client";

import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Eye, Share2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { updateBlog } from "@/actions/blogs/update-blog";
import ProfileCard from "@/components/profile-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { useUserData } from "@/hooks/user-data";

interface BlogCardProps {
  id: string;
  thumbnail: string;
  title: string;
  likes: number;
  content: string;
  link: string;
  date: string;
  name: string;
  userName: string;
  userImage: string;
  likedId: string[];
}

const BlogCard = ({
  id,
  thumbnail,
  title,
  likes,
  content,
  link,
  date,
  name,
  userName,
  userImage,
  likedId,
}: BlogCardProps) => {
  const { user } = useUserData();
  const [like, setLike] = useState(likedId?.includes(user?.id!));

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Jayma Bio Innovations",
          text: "Check out this blog!",
          url: `${process.env.NEXT_PUBLIC_APP_URL!}${link}`,
        });
        toast("Link shared successfully");
      } catch (error) {
        toast("Error sharing the link");
      }
    } else {
      window.navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_APP_URL!}${link}`
      );
      toast("Link copied to clipboard");
    }
  };

  const handleLike = async (id: string) => {
    setLike(!like);
    try {
      const data = await updateBlog({
        id: id,
        likes: like ? likes - 1 : likes + 1,
        likedId: like
          ? likedId.filter((likeId) => likeId !== user?.id)
          : [...likedId, user?.id!],
      });

      if (data.success) {
        toast("Blog liked successfully");
      } else {
        toast("Error liking the blog");
      }
    } catch (error) {
      toast("Error liking the blog");
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
              <Avatar className="lg:h-12 lg:w-12 h-12 w-12">
                <AvatarImage
                  src={userImage}
                  alt={`${userName}'s profile image`}
                />
                <AvatarFallback className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 text-white">
                  <FaUser className="lg:w-5 lg:h-5 h-10 w-10" />
                </AvatarFallback>
              </Avatar>
              <p className="font-extralight text-sm">{name}</p>
              <p className="font-extralight text-sm">@{userName}</p>
              <p className="font-extralight text-sm">{formatDate(date, 1)}</p>
            </div>
            <button onClick={handleShare} className="border-none">
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
              <button onClick={() => handleLike(id)}>
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
