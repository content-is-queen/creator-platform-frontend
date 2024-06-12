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
    console.log(error);
  }
};

const AdminOpportunities = async () => {
  const opportunities = await getOpportunities();

  return (
    <Container size="6xl" className="mt-16">
      <AdminOpportunitiesTable opportunities={opportunities} />
    </Container>
  );
};

export default AdminOpportunities;
