"use client";

import CreatorDashboard from "@/components/Creator/CreatorDashboard";
import ClientDashboard from "@/components/Client/ClientDashboard";

import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const Component = user && user.role === "brand" ? ClientDashboard : CreatorDashboard;

  if (user)
  return (
    <main>
      {user && <Component user={user} />}
    </main>
  );

  return null;
};

export default Dashboard;
