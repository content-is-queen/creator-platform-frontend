"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserProvider } from "@/context/UserContext";
const AppLayout = ({ children }) => {
  return (
    <>
      <UserProvider>{children}</UserProvider>
      <ToastContainer />
    </>
  );
};
export default AppLayout;
