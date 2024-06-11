"use client";

import { useUser } from "@/context/UserContext";

const Dashboard = ({ children }) => {
  const { user } = useUser();

  if (user) {
    return children.find((child) => child.type.roles?.includes(user.role));
  }

  return null;
};

export default Dashboard;
