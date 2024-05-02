// components/ChatSideBar.tsx
import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { PlusCircle, MessageCircle } from 'lucide-react';
import NewChat from './createNewChat'; // Corrected import

type Props = {
  chats: { id: number; messages: { id: number; chatId: number; content: string; createdAt: string; role: 'user' | 'system' }[]; createdAt: string; userId: string; }[];
  chatId: number;
};

const ChatSideBar = ({ chats, chatId }: Props) => {
  // Adjusted to return the createdAt string directly
  const truncateMessage = (createdAt: string) => {
    return createdAt; // Display the createdAt string directly
  };

  return (
    <div className="w-full max-h-screen overflow-hidden soff p-4 text-black-800 bg-white-800">
      <NewChat /> {/* Corrected usage */}
      <div className="flex h-screen overflow-hidden pb-20 flex-col gap-2 mt-4">
        {chats.map((chat) => {
          // Use the createdAt property directly
          const truncatedMessage = truncateMessage(chat.createdAt);

          return (
            <Link key={chat.id} href={`/chat/${chat.id}`}>
              <div className="rounded-lg p-3 text-black flex items-center">
                <MessageCircle className="mr-2" />
                <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
                  {truncatedMessage}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      <div className='absolute bottom-4 left-4'>
        <div className='flex items-center gap-2 text-slate-500 flex-wrap'>
          <Link href={'/'}>Home</Link>
          <Link href={'/'}>Settings</Link>
        </div>
      </div>
    </div>
  );
};

export default ChatSideBar;
