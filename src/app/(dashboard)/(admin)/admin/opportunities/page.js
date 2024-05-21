import API from "@/api/api";

import Container from "@/components/Container";
import AdminOpportunitiesTable from "@/components/Admin/AdminOpportunitiesTable";

const getOpportunities = async () => {
  // Prevent build failing during workflows build test
  if (process.env.APP_ENV === "development") {
    return [];
  }

  try {
    const { data } = await API.get("/admin/opportunities");
    return data.message;
  } catch (error) {
    throw new Error("Something went wrong when getting opportunities");
  }
};

const AdminOpportunities = async () => {
  const opportunities = await getOpportunities();

  return (
    <Container>
      <AdminOpportunitiesTable opportunities={opportunities} />
    </Container>
  );
};

export default AdminOpportunities;
