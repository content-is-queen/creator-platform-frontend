"use client";

import { UserProvider } from "@/context/UserContext";

const Providers = ({ children }) => {
  return <UserProvider>{children}</UserProvider>;
};

export default Providers;
