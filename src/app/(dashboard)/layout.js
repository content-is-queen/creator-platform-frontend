"use client";

import MainNav from "@/components/MainNav";
import SkipTo from "@/components/SkipTo";

const Layout = ({ children }) => (
  <>
    <SkipTo />
    <MainNav />
    <main id="main-content">{children}</main>
  </>
);

export default Layout;
