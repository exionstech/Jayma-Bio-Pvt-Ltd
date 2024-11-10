"use server";

import prismadb from "@/lib/prismadb";
import { Block } from "@blocknote/core";

type BlogFormValues = {
  thumbnail: string;
  title: string;
  likes: number;
  content: string;
};

export default async function addBlogs(data: BlogFormValues) {
  try {
    await prismadb.blog.create({
      data: {
        thumbnail: data.thumbnail,
        title: data.title,
        likes: data.likes,
        content: data.content,
      },
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
