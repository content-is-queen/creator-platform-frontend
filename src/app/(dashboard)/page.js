"use client";

import CreatorDashboard from "@/components/Creator/CreatorDashboard";
import ClientDashboard from "@/components/Client/ClientDashboard";

import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";

const Dashboard = () => {
  const { user } = useAuth();

  useEffect(() => {}, [user]);

  const Component = user.role === "brand" ? ClientDashboard : CreatorDashboard;

  if (user)
    return (
      <main>
        <Component user={user} />
      </main>
    );

  return null;
};

export default Dashboard;
