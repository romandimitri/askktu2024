import React from 'react'
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import ChatComponent from '@/app/components/ChatComponent';
import ChatSideBar from "@/app/components/ChatSideBar";

type Props = {
  params: { chatId: string }
}

const ChatPage = async ({ params: { chatId } }: Props) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
  if (!_chats) {
    return redirect("/");
  }

  if (!_chats.find((chat) => chat.id === parseInt(chatId))) {
    return redirect("/");
  }

  const currentChat = _chats.find((chat) => chat.id === parseInt(chatId));

  const formattedChats = _chats.map((chat) => {
    let parsedMessages;
    try {
      parsedMessages = JSON.parse(chat.messages);
    } catch (error) {
      console.error(`Failed to parse messages for chat ${chat.id}: ${error}`);
      parsedMessages = []; // or any other default value you prefer
    }

    return {
      id: chat.id,
      messages: parsedMessages.map((message: any) => ({
        id: message.id,
        chatId: message.chatId,
        content: message.content,
        createdAt: message.createdAt,
        role: message.role,
      })),
      createdAt: chat.createdAt.toISOString(),
      userId: chat.userId,
    };
  });

  return (
    <div className="flex max-h-screen overflow">
      <div className="flex-[1] max-w-xs">
        <ChatSideBar chats={formattedChats} chatId={parseInt(chatId)} />
      </div>
      <div className="flex-[3] border-l-4 border-l-slate-200">
        <ChatComponent chatId={parseInt(chatId)} />
      </div>
    </div>
  );
}

export default ChatPage