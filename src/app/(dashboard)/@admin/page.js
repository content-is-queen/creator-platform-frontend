import Heading from "../Heading";
import Container from "../Container";
import CreateOpportunityModal from "../Brand/CreateOpportunityModal";
import BrandOpportunities from "../Brand/BrandOpportunities";
import AdminStats from "@/components/Admin/AdminStats";

const AdminDashboard = () => {
  return (
    <div>
      <section className="bg-queen-yellow py-12 md:py-20">
        <Container size="5xl" className="space-y-8">
          <Heading size="4xl">Overview</Heading>

          <AdminStats className="grid grid-cols-3 gap-4"></AdminStats>
        </Container>
      </section>

      <section className="bg-queen-white py-12 md:py-20">
        <Container size="5xl" className="space-y-8">
          <div className="flex justify-between items-center mb-8">
            <Heading>Projects</Heading>
            <CreateOpportunityModal />
          </div>
          <BrandOpportunities />
        </Container>
      </section>
    </div>
  );
};

export default AdminDashboard;

AdminDashboard.roles = ["admin", "super_admin"];
