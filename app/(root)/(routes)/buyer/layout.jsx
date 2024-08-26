import { auth } from '@clerk/nextjs/server'
import prismadb from '@/lib/prismadb';
import { redirect } from 'next/navigation';
import React from 'react'
import ToastCall from "@/components/toastCall"
import Chat from "@/components/chatBot"


export default async function BuyerPageLayout({children}) {

    const {userId} = auth();

    if(!userId){
        redirect("/sign-in")
    }

    console.log("before buyerExist");
    const buyerExist = await prismadb.buyer.findFirst({
        where:{
            userId
        }
    });


    if(buyerExist){
        redirect("/")
    }

    console.log("before sellerExist");
    const sellerExist = await prismadb.seller.findFirst({
        where:{
            sellerid:userId
        }
    });


    console.log("before toastcall");
    if(sellerExist){
            <ToastCall
                message ="You are not allowed to create buyer account.because you have already seller account."
            />
        
            console.log("before rediration");
            redirect("/")
    }


  return (
    <>
        <Chat/>
      {children}
    </>
  )
}