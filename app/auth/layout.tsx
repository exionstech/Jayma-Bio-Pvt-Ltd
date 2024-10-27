"use client";

import { usePathname } from "next/navigation";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <main className="w-full flex flex-col md:flex-row h-full overflow-y-hidden bg-white">
      <div className="w-2/5 hidden min-h-screen overflow-hidden md:flex flex-col justify-center items-center z-0 auth bg-black">
        <div className="flex flex-col items-start justify-center gap-4 pl-10">
          <h1 className="text-6xl font-medium text-white leading-[3.7rem] capitalize">
            {pathname === "/auth/login"
              ? "Sign in into your account"
              : "  Create a New Account"}
          </h1>
          <p className="text-xl font-medium text-white">
            {pathname === "/auth/login"
              ? "Sign in and get started"
              : "Create an account and get started"}
          </p>
        </div>
      </div>
      <div className="md:hidden w-full h-[36vh] flex flex-col gap-3 items-start justify-center auth-mobile pl-8">
        <h1 className="text-3xl font-medium text-white w-[80%]">
          {pathname === "/auth/login"
            ? "Sign in into your account"
            : "  Create a New Account"}
        </h1>
        <p className="text-lg font-medium text-white">
          {pathname === "/auth/login"
            ? "Sign in and get started"
            : "Create an account and get started"}
        </p>
      </div>
      <div className="w-full md:w-3/5 max-h-screen">{children}</div>
    </main>
  );
};

export default AuthLayout;
