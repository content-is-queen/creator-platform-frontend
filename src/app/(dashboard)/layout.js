import Providers from "@/components/Providers";

import MainNav from "@/components/MainNav";

export default function DashboardLayout({ children }) {
  return (
    <Providers>
      <MainNav />
      {children}
    </Providers>
  );
}
