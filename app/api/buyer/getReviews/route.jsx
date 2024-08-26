import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req){
    try {
        
        const { searchParams } = new URL(req.url);
        const productId = searchParams.get("productId");


        const reviews = await prismadb.review.findMany({
            where:{
                productId
            }
        })


        return NextResponse.json(reviews)

    } catch (error) {
        console.log("error in reviews fetching")
        return new NextResponse("error in the reviews fetching",{status:500})
    }
}