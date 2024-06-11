"use client";

import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

const AuthTemplate = ({ children }) => {
  const { user, userLoaded } = useUser();
  const router = useRouter();

  useLayoutEffect(() => {
    if (user?.first_name && userLoaded) {
      router.push("/");
    }
  }, [user]);

  return (
    <div className="grid min-h-screen md:grid-cols-12">
      <div className="bg-queen-blue relative flex items-center justify-center h-full overflow-hidden py-6 md:py-10 md:col-span-4 lg:col-span-5">
        <img
          className="h-24 max-w-full md:fixed md:w-52 md:-translate-y-1/2 md:top-1/2 md:h-auto lg:w-80"
          src="/images/CiQ_Logo_Stacked.svg"
          alt="Content is queen"
        />
        <img
          src="/images/orange-dots-circle.svg"
          alt=""
          className="fixed hidden w-26 md:block md:-bottom-30 md:-left-20 lg:-bottom-10 lg:-left-10"
        />
      </div>
      <div className="flex pt-12 pb-16 md:py-20 items-center h-full md:col-span-8 lg:col-span-7">
        <div className="w-full max-w-md mx-auto px-8 space-y-6 md:space-y-8 md:px-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthTemplate;
