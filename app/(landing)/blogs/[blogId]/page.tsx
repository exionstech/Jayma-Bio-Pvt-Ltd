import { getAllBlogById } from "@/actions/all-blogs/get-all-blogs";
import { MaxWrapper } from "@/components/shared/max-wrapper";
import React from "react";
import BlogComponent from "./_components/blog-component";

interface PageProps {
  params: {
    blogId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { data } = await getAllBlogById(params.blogId);

  return (
    <MaxWrapper>
      <section className="mt-8 md:mt-12 py-4 md:py-8 max-w-screen-2xl mx-auto">
        <BlogComponent blog={data!} />
      </section>
    </MaxWrapper>
  );
};

export default Page;
