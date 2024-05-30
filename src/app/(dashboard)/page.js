"use client";

import Dashboard from "@/components/Dashboard";
import CreatorDashboard from "@/components/Creator/CreatorDashboard";
import BrandDashboard from "@/components/Brand/BrandDashboard";
import AdminDashboard from "@/components/Admin/AdminDashboard";

const Page = () => {
  return (
    <Dashboard>
      <AdminDashboard />
      <CreatorDashboard />
      <BrandDashboard />
    </Dashboard>
  );
};

export default Page;
