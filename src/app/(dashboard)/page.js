"use client";

import Dashboard from "@/components/Dashboard";
import CreatorDashboard from "@/components/Creator/CreatorDashboard";
import ClientDashboard from "@/components/Client/ClientDashboard";

const Page = () => {
  return (
    <Dashboard>
      <CreatorDashboard />
      <ClientDashboard />
    </Dashboard>
  );
};

export default Page;
