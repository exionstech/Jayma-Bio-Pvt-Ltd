"use server";

import prismadb from "@/lib/prismadb";
import { Block } from "@blocknote/core";
import { sendEventMail } from "../event-newsletter";

type BlogFormValues = {
  id: string;
  thumbnail?: string;
  title?: string;
  content?: Block[];
  toggle?: boolean;
  archived?: boolean;
};

export async function updateBlog(data: BlogFormValues) {
  try {
    const blog = await prismadb.blog.update({
      where: {
        id: data.id,
      },
      data: {
        thumbnail: data.thumbnail,
        title: data.title,
        content: JSON.stringify(data.content),
        toggle: data.toggle,
        archived: data.archived,
      },
    });

    if (data.toggle && !data.archived) {
      const res = await sendEventMail(
        blog.title,
        blog.title,
        new Date(blog.updatedAt).toDateString()
      );
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
