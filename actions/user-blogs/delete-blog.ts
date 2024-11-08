"use server";

import prismadb from "@/lib/prismadb";

export async function deleteBlog(id: string) {
  try {
    await prismadb.userBlog.delete({
      where: {
        id: id,
      },
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}