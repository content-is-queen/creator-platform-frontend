"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useUser } from "@/context/UserContext";

const AuthGuard = ({ children }) => {
  const { loading, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading]);

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
