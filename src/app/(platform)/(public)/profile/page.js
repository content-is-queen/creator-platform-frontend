import Profile from "@/components/Profile";
import AuthGuard from "@/components/AuthGuard";

const Page = () => (
  <AuthGuard>
    <Profile />
  </AuthGuard>
);

export default Page;

export const metadata = {
  title: "Profile",
};
