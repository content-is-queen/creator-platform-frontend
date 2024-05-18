"use client";

import { useUser } from "@/context/UserContext";

const Dashboard = ({ children }) => {
  const { user } = useUser();

  if (user) {
    return children.find((i) => i.type.role === user?.role);
  }

  return null;
};

export default Dashboard;
