"use client";

import CreatorDashboard from "@/components/Creator/CreatorDashboard";
import ClientDashboard from "@/components/Client/ClientDashboard";

import useAuth from "@/hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  const Component = user.role === "brand" ? ClientDashboard : CreatorDashboard;

  if (user)
    return (
      <main>
        <Component />
      </main>
    );

  return null;
};

export default Dashboard;
