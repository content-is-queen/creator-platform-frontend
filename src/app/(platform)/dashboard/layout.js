"use client";

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
    return null;
  }

  return (
    <>
      {children}
      {Component}
    </>
  );
}
