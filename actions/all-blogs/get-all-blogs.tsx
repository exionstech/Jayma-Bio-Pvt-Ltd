"use server";

import prismadb from "@/lib/prismadb";

export async function getAllBlogs() {
  try {
    const admin_blogs = await prismadb.blog.findMany();
    const user_blogs = await prismadb.userBlog.findMany();
    const blogs = [...admin_blogs, ...user_blogs];
    
    return { data: blogs, success: true };
  } catch (error) {
    console.error(error);
    return { data: null, success: false };
  }
}

export async function getAllBlogById(id: string) {
  try {
    const user_blogs = await prismadb.userBlog.findUnique({
      where: {
        id: id,
      },
    });

    if (user_blogs) {
      return { data: user_blogs, success: true };
    } else {
      const admin_blogs = await prismadb.blog.findUnique({
        where: {
          id: id,
        },
      });
      
      if (admin_blogs) {
        return { data: admin_blogs, success: true };
      }
    }

    return { data: null, success: false };
  } catch (error) {
    console.error(error);
    return { data: null, success: false };
  }
}
