import Container from "@/components/Container";
import AdminOpportunitiesSearch from "@/components/Admin/AdminOpportunitiesSearch";

const getOpportunities = async () => {
  // Prevent build failing during workflows build test
  if (process.env.APP_ENV === "development") {
    return [];
  }

  try {
    const { data } = await API.get("/admin/opportunities");
    return data.message;
  } catch (error) {
    throw new Error("Something went wrong with getting opportunities");
  }
};

const AdminOpportunities = async () => {
  const opportunities = await getOpportunities();

  return (
    <Container className="mb-32">
      <AdminOpportunitiesSearch opportunities={opportunities} />
    </Container>
  );
};

export default AdminOpportunities;
