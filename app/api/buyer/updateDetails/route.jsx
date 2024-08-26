import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";



export async function PATCH(req) {


    try {
  
     const{userId} = auth();
     const body = await req.json();
  
     console.log("inside the updated api",body);
     console.log("userId",userId)
  
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
   
     const buyer = await prismadb.buyer.update({
        where:{
          userId
        },
  
       data: {
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
         console.log("error inside the updateAccount api",error);
         return new NextResponse("Failed to update the account. Please try again.",{status:500})
    }
  }