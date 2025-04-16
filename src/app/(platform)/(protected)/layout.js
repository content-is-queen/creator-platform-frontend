import AuthGuard from "@/components/AuthGuard";

const ProtectedLayout = ({ children }) => <AuthGuard>{children}</AuthGuard>;

export default ProtectedLayout;
