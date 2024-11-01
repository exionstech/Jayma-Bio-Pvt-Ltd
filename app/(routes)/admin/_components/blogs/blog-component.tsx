"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useConfirm } from "@/hooks/use-confirm";
import { toast } from "sonner";
import Link from "next/link";
import { deleteBlog } from "@/actions/blogs/delete-blog";
import { getBlogs } from "@/actions/blogs/get-blogs";
import { Block } from "@blocknote/core";

interface Blog {
  id: string;
  thumbnail: string;
  title: string;
  content: any;
  likes: number;
}

const BlogComponent = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Blog",
    "Are you sure you want to delete this blog? This action cannot be undone."
  );

  const fetchBlogs = async () => {
    try {
      await getBlogs().then((data) => {
        if (data.success) {
          if (data.data) {
            setBlogs(data.data);
          } else {
            setBlogs([]);
          }
        } else {
          toast.error("Failed to fetch blogs");
        }
      });
    } catch (error) {
      toast.error("Error fetching blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (await confirm()) {
      try {
        await deleteBlog(id).then((data) => {
          if (data.success) {
            toast.success("Blog deleted successfully");
            fetchBlogs();
          } else {
            toast.error("Failed to delete blog");
          }
        });
      } catch (error) {
        toast.error("Error deleting blog");
      }
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Blogs</h1>
          <Link href="/admin/blogs/new">
            <Button className="bg-green hover:bg-green/90 flex items-center gap-2">
              Add Blog
              <Plus className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog.id} className="border rounded-lg p-4 space-y-4">
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <div className="flex justify-between items-center">
                <span>{blog.likes} likes</span>
                <div className="flex gap-2">
                  <Link href={`/admin/blogs/edit/${blog.id}`}>
                    <Button variant="outline" size="sm">
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(blog.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ConfirmDialog />
    </>
  );
};

export default BlogComponent;
