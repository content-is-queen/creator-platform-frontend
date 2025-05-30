"use client";

import { useUser } from "@/context/UserContext";

export default function DashboardLayout(props) {
  const { user } = useUser();
  const { children, admin, creator, brand } = props;
  console.log(props);
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
