import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  
  try {
    const product = await prismadb.products.create({
      data: data,
    });
    
    return NextResponse.json({
      message: "Product created",
      product: product,
      status: 200,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      message: "Failed to create product",
      status: 400,
    });
  }
}
