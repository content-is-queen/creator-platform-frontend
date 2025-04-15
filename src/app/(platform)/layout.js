import Providers from "@/components/Providers";

import MainNav from "@/components/MainNav";
import AuthGuard from "@/components/AuthGuard";

export default function DashboardLayout({ children }) {
  return (
    <Providers>
      <MainNav />
      {children}
    </Providers>
  );
}
