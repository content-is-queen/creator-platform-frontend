import AdminGuard from "@/components/AdminGuard";

const AdminLayout = ({ children }) => <AdminGuard>{children}</AdminGuard>;

export default AdminLayout;
