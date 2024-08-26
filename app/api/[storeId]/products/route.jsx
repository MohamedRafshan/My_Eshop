import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";



//have to modify this for get products by search queries
export async function GET(req,{params}) {
  try {

    const {searchParams} = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const isDisplay = searchParams.get("isDisplay");


    if (!params.storeId) {
      return new NextResponse("storeId is required", { status: 400 });
    }


    const products = await prismadb.Product.findMany({
      where: {
        storeId:params.storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured :isFeatured ? true : undefined,
        isArchived:false
      },
      include:{
        images:true,
        category:true,
        color:true,
        size:true
      },
      orderBy:{
        createdAt:"desc"
      }
    });


 

    return NextResponse.json(products);
  } catch (error) {
    console.log("error in the products GET request", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}




export async function POST(req,{params}) {
  try {
    const { userId } = auth();

    const body = await req.json();

    console.log("body inside the product POST",body);
    const {
        name,
        imageUrls,
        price,
        categoryId,
        discount,
        isDisplay,
        availableCount,
        description,
        mainCategory
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("label is required", { status: 400 });
    }
    if (!imageUrls || !imageUrls.length) {
      return new NextResponse("images is required", { status: 400 });
    }
    if (!price) {
      return new NextResponse("price is required", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("categoryId is required", { status: 400 });
    }
    if (!availableCount) {
      return new NextResponse("availableCount is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("storeId is required", { status: 400 });
    }

    const storebyuserId = await prismadb.store.findFirst({
      where:{
        id:params.storeId,
        ownerId:userId
      }
    })

    if(!storebyuserId){
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const product = await prismadb.Product.create({
      data: {
        name,
        imageUrls,
        price,
        categoryId,
        discount,
        isDisplay,
        availableCount,
        storeId:params.storeId,
        description,
        mainCategory
      },

    });

    console.log("product creation in post method",product);


    return NextResponse.json(product);
  } catch (error) {
    console.log("error in the product POST request", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}