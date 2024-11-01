"use server";

import prismadb from "@/lib/prismadb";
import { Block } from "@blocknote/core";

type BlogFormValues = {
  id: string;
  thumbnail?: string;
  title?: string;
  content?: Block[];
};

export async function updateBlog(data: BlogFormValues) {
  try {
    await prismadb.blog.update({
      where: {
        id: data.id,
      },
      data: {
        thumbnail: data.thumbnail,
        title: data.title,
        content: JSON.stringify(data.content),
      },
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
