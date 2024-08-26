import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req) {

    try {

        const body = req.json();
        const {otherUserId} = body;

        console.log("otherUserId",otherUserId)

        if(!otherUserId){
            return new NextResponse("otherUserId is missing",{status:400});
        }

        const seller = await prismadb.seller.findUnique({
            where:{
                sellerid:otherUserId
            }
        })

        if(seller){
            return  NextResponse.json(seller);
        }

        const buyer = await prismadb.buyer.findUnique({
            where:{
                userId:otherUserId
            }
        })

        if(buyer){
            return  NextResponse.json(buyer);
        }
        
        return NextResponse("user not found",{status:404});

    } catch (error) {
        console.log("error inside the get other user",error)
        return new NextResponse("error inside the get other user",{status:500});
    }
}