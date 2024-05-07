"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { UserProvider } from "@/context/UserContext";

const queryClient = new QueryClient();

const Providers = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>{children}</UserProvider>
    </QueryClientProvider>
  );
};

export default Providers;
