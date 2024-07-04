"use client";

import MainNav from "@/components/MainNav";

const Layout = ({ children }) => (
  <>
    <MainNav />
    {children}
  </>
);

export default Layout;
