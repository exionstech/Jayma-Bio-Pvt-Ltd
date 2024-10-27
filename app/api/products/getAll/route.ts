import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const products = await prismadb.products.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      message: "Products fetched successfully",
      products: products,
      status: 200,
    });
  } catch (error: any) {
    console.error("[PRODUCTS_GET]", error);
    return NextResponse.json(
      {
        message: "Failed to fetch products",
        error: error.message,
        status: 500,
      },
      { status: 500 }
    );
  }
}
