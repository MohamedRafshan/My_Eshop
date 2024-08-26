
import { auth } from '@clerk/nextjs/server'
import prismadb from '@/lib/prismadb';
import { redirect } from 'next/navigation';
import React from 'react'
import ModalProvider from "@/providers/modal-provider";
import ToastCall from '@/components/toastCall';

export default async function SetupPageLayout({children}) {

    const {userId} = auth();

    if(!userId){
        redirect("/sign-in")
    }

    const buyerExist = await prismadb.buyer.findFirst({
      where:{
          userId
      }
    });

    if(buyerExist){
      <ToastCall
          message ="You are not allowed to create seller account.because you have already buyer account."
      />
        redirect("/")
    }

    const store = await prismadb.store.findFirst({
        where:{
            ownerId:userId
        }
    });

    if(store){
        redirect(`/${store.id}`)
    }


  return (
    <>
     <ModalProvider/>
      {children}
    </>
  )
}