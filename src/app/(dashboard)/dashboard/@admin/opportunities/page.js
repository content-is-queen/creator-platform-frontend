import API from "@/api/api";

import Container from "@/components/Container";
import AdminOpportunitiesTable from "@/components/Admin/AdminOpportunitiesTable";

export const dynamic = "force-dynamic";

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
    return [];
  }
};

const AdminOpportunities = async () => {
  const opportunities = await getOpportunities();

  return (
    <div className="bg-queen-white">
      <Container size="6xl" className="mt-10">
        <AdminOpportunitiesTable opportunities={opportunities} />
      </Container>
    </div>
  );
};

export default AdminOpportunities;
