import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    const product = await prismadb.products.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({
      message: "Product deleted successfully",
      status: 200,
    });
  } catch (error: any) {
    console.error("[PRODUCT_PATCH]", error);
    return NextResponse.json(
      {
        message: "Failed to delete product",
        error: error.message,
        status: 400,
      },
      { status: 400 }
    );
  }
}
