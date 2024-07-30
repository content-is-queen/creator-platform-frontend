import SkipTo from "@/components/SkipTo";
import MainNav from "@/components/MainNav";

export default function DashboardLayout({ children }) {
  return (
    <>
      <SkipTo />
      <MainNav />
      {children}
    </>
  );
}
