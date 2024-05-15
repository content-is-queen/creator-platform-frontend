import Container from "@/components/Container";
import Heading from "@/components/Heading";
import BrandOpportunities from "@/components/Brand/BrandOpportunities";
import CreateOpportunityModal from "@/components/Brand/CreateOpportunityModal";

const BrandDashboard = () => {
  return (
    <div className="h-full py-12 md:py-20">
      <Container>
        <div className="flex justify-between items-center mb-8">
          <Heading>Projects</Heading>
          <CreateOpportunityModal />
        </div>
        <BrandOpportunities />
      </Container>
    </div>
  );
};

export default BrandDashboard;

BrandDashboard.role = "brand";
