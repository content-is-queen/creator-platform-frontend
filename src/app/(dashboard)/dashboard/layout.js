"use client";

import SpinnerScreen from "@/components/SpinnerScreen";
import { useUser } from "@/context/UserContext";

export default function DashboardLayout({ children, admin, creator, brand }) {
  const { user } = useUser();

  let Component;

  switch (user?.role) {
    case "creator":
      Component = creator;
      break;
    case "brand":
      Component = brand;
      break;
    default:
      Component = admin;
  }

  if (!user) {
    return <SpinnerScreen />;
  }

  return (
    <>
      {children}
      {Component}
    </>
  );
}
