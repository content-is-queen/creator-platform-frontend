import Providers from "@/components/Providers";

import SkipTo from "@/components/SkipTo";
import MainNav from "@/components/MainNav";

export default function DashboardLayout({ children }) {
  return (
    <Providers>
      <SkipTo />
      <MainNav />
      {children}
    </Providers>
  );
}
