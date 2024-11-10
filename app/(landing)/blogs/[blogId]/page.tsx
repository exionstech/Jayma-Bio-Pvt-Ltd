import React from "react";

interface PageProps {
  params: {
    blogId: string;
  };
}

const Page = ({ params }: PageProps) => {
  return (
    <section className="mt-8 md:mt-12 py-4 md:py-8 max-w-screen-2xl mx-auto">
      <h1 className="text-center text-6xl font-bold text-green">Blogs</h1>
      <div className="py-10 px-20">{params.blogId}</div>
    </section>
  );
};

export default Page;
