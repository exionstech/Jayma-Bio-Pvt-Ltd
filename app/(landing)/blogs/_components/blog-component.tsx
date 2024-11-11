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
              key={id}
              thumbnail={thumbnail}
              title={title}
              likes={likes}
              content={JSON.parse(content)[0].content[0].text}
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
