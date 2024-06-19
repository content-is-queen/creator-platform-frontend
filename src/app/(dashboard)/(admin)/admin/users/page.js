import Container from "@/components/Container";
import AdminUsersTable from "@/components/Admin/AdminUsersTable";

const AdminUsers = async () => (
  <Container size="6xl" className="mt-16">
    <AdminUsersTable />
  </Container>
);

export default AdminUsers;
