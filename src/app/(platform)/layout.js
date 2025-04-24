import Providers from "@/components/Providers";

import MainNav from "@/components/MainNav";
import AuthGuard from "@/components/AuthGuard";

export default function DashboardLayout({ children }) {
  return (
    <Providers>
      <MainNav />
      <div
        style={{ minHeight: "calc(100vh - var(--nav-height))" }}
        className={`bg-queen-white bg-dots bg-repeat-x bg-fixed bg-[center_bottom_-4.5rem]`}
      >
        {children}
      </div>
    </Providers>
  );
}
