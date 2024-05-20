import Container from "@/components/Container";
import AdminOpportunitiesSearch from "@/components/Admin/AdminOpportunitiesSearch";

const AdminOpportunities = async () => {
  return (
    <Container className="mb-32">
      <AdminOpportunitiesSearch />
    </Container>
  );
};

export default AdminOpportunities;
