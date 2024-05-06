"use client";

import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";

import { useUser } from "@/context/UserContext";

import Dots from "@/components/Patterns/Dots";

const AuthTemplate = ({ children }) => {
  const { user, loaded, setLoaded } = useUser();
  const router = useRouter();

  useLayoutEffect(() => {
    if (user?.first_name && loaded) {
      router.push("/");
    }
    setLoaded(true);
  }, [loaded, user]);

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="bg-queen-blue flex items-center justify-center relative h-full overflow-hidden">
        <div className="h-20 md:h-auto flex justify-center items-center">
          <img
            className="h-28 -translate-y-1/2 top-1/2 fixed md:h-auto"
            src="/images/CiQ_Logo_Stacked.svg"
            alt="Content is queen"
          />
        </div>
        <Dots className="absolute md:fixed -left-48 -bottom-60 md:-left-40 md:-bottom-52 text-queen-orange" />
      </div>
      <div className="flex justify-center py-20 items-center h-full">
        <div className="w-full max-w-md mx-auto space-y-6 px-8 md:px-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthTemplate;
