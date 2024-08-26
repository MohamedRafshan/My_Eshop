import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {

    

   try {

    const{userId} = auth();
    const body = await req.json();

    console.log("inside the createAccount api",body);

    const {
        UserFullName,
        UserPhoneNum,
        UserEmail,
        province, 
        district,
        area, 
        address 
    } = body;

    

    if (!userId) {
      return NextResponse.forbidden("Unauthorized");
    }
  
    const buyer = await prismadb.buyer.create({

      data: {
        userId,
        name:UserFullName,
        phoneNum:UserPhoneNum,
        email:UserEmail,
        province,
        district,
        area,
        address,
      },
    });
  
    return NextResponse.json(buyer);
    
   } catch (error) {
        console.log("error inside the createAccount api",error);
        return new NextResponse("Failed to create an account. Please try again.",{status:500})
   }
}



