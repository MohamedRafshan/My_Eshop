import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";


export async function GET(req,{params}){

    try {
        const {subCategoryId} = params;

        const products = await prismadb.product.findMany({
            where:{
                categoryId:subCategoryId
            },
            include:{
                reviews:true
            }
        });
        return NextResponse.json(products);
    } catch (error) {
        console.log("error in the getSameSubCategoryProducts",error);
        return new NextResponse("error in the getSameSubCategoryProducts ",{status:500});
    }
}