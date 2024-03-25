"use client";

import { useLayoutEffect } from "react";
import { redirect } from "next/navigation";

import { useUserProfile } from "@/contexts/AuthContext/UserProfileContext";
import CreatorDashboard from "@/components/Creator/CreatorDashboard";
import ClientDashboard from "@/components/Client/ClientDashboard";

export const dynamicParams = false;

const Dashboard = () => {
  const { userProfile } = useUserProfile();

  const Component =
    userProfile?.role === "creator" ? CreatorDashboard : ClientDashboard;

  useLayoutEffect(() => {
    if (!userProfile?.role) {
      redirect("/login");
    }
  }, []);

  return (
    <main>
      <Component userProfile={userProfile} />
    </main>
  );
};

export default Dashboard;
