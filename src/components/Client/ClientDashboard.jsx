import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ClientOpportunities from "@/components/Client/ClientOpportunities";
import CreateOpportunityModal from "@/components/Client/CreateOpportunityModal";

const ClientDashboard = () => {
  return (
    <div className="h-full py-12 md:py-20">
      <Container>
        <div className="flex justify-between items-center mb-8">
          <Heading>Projects</Heading>
          <CreateOpportunityModal />
        </div>
        <ClientOpportunities />
      </Container>
    </div>
  );
};

export default ClientDashboard;

ClientDashboard.role = "brand";
