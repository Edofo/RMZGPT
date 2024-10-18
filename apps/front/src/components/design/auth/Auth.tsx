import { useState } from "react";

import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";

export const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="relative mx-auto flex min-h-screen min-w-[90vw] max-w-[500px] items-center justify-center overflow-hidden">
      <div className="z-10 w-full max-w-md rounded-xl bg-white bg-opacity-20 p-8 shadow-2xl backdrop-blur-lg">
        <h1 className="mb-8 text-center font-bold text-4xl text-white">
          {isSignIn ? "Welcome Back! 🎉" : "Register Now! 🎉"}
        </h1>
        {isSignIn ? <SignIn /> : <SignUp />}

        <p className="mt-6 text-center text-sm text-white">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            className="border-none bg-transparent px-1 font-medium text-blue-300 hover:text-blue-200"
            onClick={() => setIsSignIn(!isSignIn)}
          >
            {isSignIn ? "Sign up now!" : "Sign in!"}
          </button>
        </p>
      </div>
    </div>
  );
};
