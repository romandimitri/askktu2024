// /api/create-chat.ts
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { chats, message } from "@/lib/db/schema";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const { initialMessage } = await req.json();

    // Insert a new chat record into the database
    const chat_id = await db
      .insert(chats)
      .values({ messages: JSON.stringify([{ role: 'user', content: initialMessage }]), userId })
      .returning({ insertedId: chats.id });

    if (!chat_id || chat_id.length === 0) {
      return NextResponse.json({ error: "Failed to create chat" }, { status: 500 });
    }

    return NextResponse.json({ chat_id: chat_id[0].insertedId }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "internal server error" }, { status: 500 });
  }
}