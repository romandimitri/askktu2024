// Home.tsx

import { HoverBorderGradient } from "../components/hover-border-gradient";
import { BackgroundBeams } from "../components/background-beams";
import Link from 'next/link'; // Import the Link component

export default function Home() {
 return (
    <div className="h-screen">
      <div className="h-full rounded-md bg-neutral-90 relative flex flex-col items-center justify-center antialiased">
        <div className="max-w-2xl mx-auto p-4">
          <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold" style={{ marginTop: '10px', paddingTop: '10px' }}>
            Welcome to
          </h1>
          <div className="flex justify-center" style={{ marginTop: '10px', paddingTop: '10px' }}>
            <img
              src="Vector.svg"
              alt="Your Logo"
              width="500" // Set width as per your requirement
              height="500" // Set height as per your requirement
            />
          </div>
          <p></p>
          <p className="relative z-10 text-lg md:text-3xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-regular" style={{ marginTop: '10px', paddingTop: '10px' }}>
            Where KTU Studies Made Easier
          </p>
        </div>
        <div className="flex justify-center text-center" style={{ marginTop: '10px', paddingTop: '10px' }}>
          <Link href="/signin"> {/* Specify the path to navigate to */}
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
            >
              <span>Sign In</span>
            </HoverBorderGradient>
          </Link>
        </div>
        <BackgroundBeams />
      </div>
    </div>
 );
}
