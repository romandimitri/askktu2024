import React from 'react';
import { HoverBorderGradient } from "../components/hover-border-gradient";
import { BackgroundBeams } from "../components/background-beams";
import Link from 'next/link';
import { UserButton, auth } from "@clerk/nextjs";
import RootLayout from '../layout';
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import GotoChat from '../components/Gotochat'; // Assuming this is the component you want to render

export default async function Home() {
  const { userId } = auth();
  const isAuth =!!userId;
  let firstChat;
  if (userId) {
    firstChat = await db.select().from(chats).where(eq(chats.userId, userId));
    if (firstChat) {
      firstChat = firstChat[0];
    }
  }

  return (
    <div className="w-screen min-h-screen bg-black">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
              <div className='flex justify-center'>            
                <UserButton afterSignOutUrl="/" /> 

              </div>
              Welcome to
            </h1>
          </div>
          <div className="flex justify-center mt-4">
            <img
              src="Vector.svg"
              alt="Your Logo"
              width="500"
              height="500"
            />
          </div>
          <p className="relative z-10 text-lg md:text-2xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-regular">
            Where KTU Studies Made Easier
          </p>
          <div className="flex mt-2">
            {isAuth && (
              <Link href={`/chat/${firstChat?.id || 'new'}`}>
                <GotoChat />
              </Link>
            )}
          </div>

     
            <p>
          <div className="w-full mt-4">
            {isAuth? (
              <p className="relative z-10 text-lg md:text-3l bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-regular">Welcome, Student!</p> // Directly render a message or any other component here
            ) : (
              <Link href="/sign-in">
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="button"
                  className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                >
                  <span>Sign In</span>
                </HoverBorderGradient>
              </Link>
            )}
          </div>
          </p>
        </div>
      </div>
      {/* <BackgroundBeams /> */}
    </div>
  );
}
