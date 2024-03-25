"use client";

import { useLayoutEffect } from "react";
import { redirect } from "next/navigation";

import CreatorDashboard from "@/components/Creator/CreatorDashboard";
import ClientDashboard from "@/components/Client/ClientDashboard";
import isAuth from "@/helpers/isAuth";

const Dashboard = () => {
  const user = isAuth();

  const Component =
    user?.role === "creator" ? CreatorDashboard : ClientDashboard;

  useLayoutEffect(() => {
    if (!user) {
      redirect("/login");
    }
  }, []);

  if (user)
    return (
      <main>
        <Component />
      </main>
    );

  return null;
};

export default Dashboard;
