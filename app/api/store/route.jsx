import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const {StoreName,UserEmail,UserFullName,UserPhoneNum,district} = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!StoreName || !UserEmail || !UserFullName || !UserPhoneNum) {
      return new NextResponse("Initial is required for create a new store ", { status: 400 });
    }

    //checking if the user already has a store
    const storeCheck = await prismadb.Seller.findFirst({
      where: {
        sellerid: userId,
      },
    });
    

    if (storeCheck) {
      return new NextResponse("User already has a store", { status: 400 });
    }
    

    // Create a new store
    const store = await prismadb.Store.create({
      data: {
        name: StoreName,
        ownerId:userId,
        district:district
      }
    });


    // Create a new seller
    await prismadb.Seller.create({
        data:{
            sellerid    : userId,
            name  : UserFullName,   
            storeId : store.id,   
            email   : UserEmail, 
            phoneNum : UserPhoneNum,
        }
    })

    return NextResponse.json(store);

  } catch (error) {
    console.log("error in the POST request", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}