import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(req,{params}) {
    try {
            
            const {userId} = params;
    
            const body = await req.json();
            const { conversationId } = body;
    
            if(!conversationId || !userId){
                return new NextResponse("conversationId or userId is missing",{status:400})
            }
    
            const updatedConversation = await prismadb.conversation.update({
                where:{
                    id:conversationId
                },
                data:{
                    seenIds:{
                        push:userId
                    }
                }
            }) 

            if(!updatedConversation){
                return new NextResponse("conversation not found",{status:404})
            }
    
            return new NextResponse(updatedConversation);
        
    } catch (error) {
        console.log("error in the Seen the conversation",error)
        return new NextResponse("error in the Seen the conversation",{status:500})
    }
}