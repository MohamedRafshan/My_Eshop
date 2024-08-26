// app/api/pusher/auth/route.js

import { getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { pusherServer } from '@/lib/pusher';

export async function POST(request) {
    const { userId } = getAuth(request);

    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    
    const { socket_id, channel_name } = body;

    console.log("socket_id:", socket_id);
    console.log("channel_name:", channel_name);
    console.log("userId:", userId);

    const authResponse = pusherServer.authorizeChannel(socket_id, channel_name, { user_id: userId });

    return NextResponse.json(authResponse);
}
