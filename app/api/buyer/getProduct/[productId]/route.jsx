
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req, { params }){

  try {
    const product = await prismadb.product.findUnique({
      where: {
        id:params.productId
      },
      include:{
        category:true,
        reviews:true
      }
    });

    console.log("product",product)
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product", error);
    return new NextResponse("Error fetching product", { status: 500 });
  }
};


