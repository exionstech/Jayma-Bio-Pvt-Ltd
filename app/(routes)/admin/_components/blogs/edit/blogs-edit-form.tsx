"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import BlogCard from "../../../_components/blogs/blog-card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface EditBlogFormProps {
  blogId: string;
  initialBlog?: any; // Add proper typing based on your blog structure
}

const EditBlogForm = ({ blogId, initialBlog }: EditBlogFormProps) => {
  const router = useRouter();
  const [blog, setBlog] = useState(initialBlog);
  const [loading, setLoading] = useState(!initialBlog);

  useEffect(() => {
    if (!initialBlog) {
      const fetchBlog = async () => {
        try {
          const response = await fetch(`/api/blogs/${blogId}`);
          const data = await response.json();
          if (data.status === 200) {
            setBlog(data.blog);
          } else {
            toast.error("Failed to fetch blog");
          }
        } catch (error) {
          toast.error("Error fetching blog");
        } finally {
          setLoading(false);
        }
      };

      fetchBlog();
    }
  }, [blogId, initialBlog]);

  const handleSubmit = async (data: any) => {
    const response = await fetch(`/api/blogs/${blogId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      router.push("/admin/blogs");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin/blogs">Blogs</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit Blog</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {blog && (
        <BlogCard mode="update" initialData={blog} onSubmit={handleSubmit} />
      )}
    </>
  );
};

export default EditBlogForm;
