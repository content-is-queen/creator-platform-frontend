"use client";

import Dashboard from "@/components/Dashboard";
import CreatorDashboard from "@/components/Creator/CreatorDashboard";
import BrandDashboard from "@/components/Brand/BrandDashboard";

const Page = () => {
  return (
    <Dashboard>
      <CreatorDashboard />
      <BrandDashboard />
    </Dashboard>
  );
};

export default Page;
