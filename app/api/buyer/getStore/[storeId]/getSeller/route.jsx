import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";


export async function GET(req,{params}){

    try {
        const seller = await prismadb.seller.findUnique({
            where:{
                storeId:params.storeId
            },
        })

        if(!seller){
            return new NextResponse("seller not found",{status:404})
        }

        return NextResponse.json(seller)
        
    } catch (error) {
        console.log("error inside the seller GET",error)
        return new NextResponse("error inside the seller GET",{status:500})
    }

}

