

import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="bg-white h-screen flex justify-center items-center">
      <div>
        <SignUp />
      </div>
    </div>
  );
}
