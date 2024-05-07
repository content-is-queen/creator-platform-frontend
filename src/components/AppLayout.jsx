"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserProvider } from "@/context/UserContext";

const queryClient = new QueryClient();

const AppLayout = ({ children }) => (
  <>
    <QueryClientProvider client={queryClient}>
      <UserProvider>{children}</UserProvider>
    </QueryClientProvider>

    <ToastContainer />
  </>
);
export default AppLayout;
