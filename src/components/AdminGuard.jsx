"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useUser } from "@/context/UserContext";

const AdminGuard = ({ children }) => {
  const { loading, user } = useUser();
  const router = useRouter();

  const isAdmin = /^(admin|super_admin)$/i.test(user?.role);

  useEffect(() => {
    if (!loading && user?.role && !isAdmin) {
      router.push("/");
    }
  }, [loading]);

  if (!user || !isAdmin) {
    return null;
  }

  return <>{children}</>;
};

export default AdminGuard;
