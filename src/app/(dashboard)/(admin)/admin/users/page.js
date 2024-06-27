import API from "@/api/api";

import Container from "@/components/Container";
import AdminUsersTable from "@/components/Admin/AdminUsersTable";

export const dynamic = "force-dynamic";

const getUsers = async () => {
  // Prevent build failing during workflows build test
  if (process.env.APP_ENV === "development") {
    return [];
  }

  try {
    const { data } = await API.get("/admin/users");

    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const AdminUsers = async () => {
  const users = await getUsers();

  return (
    <Container size="6xl" className="mt-16">
      <AdminUsersTable users={users} />
    </Container>
  );
};

export default AdminUsers;
