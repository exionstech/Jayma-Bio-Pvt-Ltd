"use client";

import React from "react";
import BlogCard from "./blog-card";
import { useBlogs } from "@/hooks/blogs/get-blogs";
import Loader from "@/components/shared/loader";

const BlogComponent = () => {
  const { blogs, loading } = useBlogs();

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="mt-8 md:mt-12 py-4 md:py-8 max-w-screen-2xl mx-auto">
      <h1 className="text-center text-6xl font-bold text-green">Blogs</h1>
      <div className="py-10 px-20">
        {blogs.map(
          ({
            thumbnail,
            title,
            likes,
            content,
            id,
            createdAt,
            name,
            userName,
            userImage,
          }) => (
            <BlogCard
              thumbnail={thumbnail}
              title={title}
              likes={likes}
              content="Jayma Bio Innovations is committed to crafting high-quality, eco-friendly products that align with modern sustainability needs. By using natural resources and focusing on local production, they deliver innovative solutions across healthcare, food, and cosmetic industries. Their dedication to quality and green practices empowers businesses to adopt sustainable choices, helping build a better, more eco-conscious future."
              link={`/blogs/${id}`}
              date={createdAt.toISOString()}
              name={name}
              userName={userName}
              userImage={userImage}
            />
          )
        )}
      </div>
    </section>
  );
};

export default BlogComponent;
