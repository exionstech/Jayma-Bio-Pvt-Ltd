import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, ...data } = body;

    const product = await prismadb.products.update({
      where: {
        id: id,
      },
      data: data,
    });

    return NextResponse.json({
      message: "Product updated successfully",
      product: product,
      status: 200,
    });
  } catch (error: any) {
    console.error("[PRODUCT_PATCH]", error);
    return NextResponse.json(
      {
        message: "Failed to update product",
        error: error.message,
        status: 400,
      },
      { status: 400 }
    );
  }
}
