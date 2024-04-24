import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ProjectsTabs from "@/components/Client/ProjectsTabs";
import Empty from "@/components/Empty";
import CreateOpportunityModal from "@/components/Client/CreateOpportunityModal";

import { getOpportunitiesByUserId } from "@/helpers/getData";

const ClientDashboard = async ({ user: { user_id } }) => {
  const opportunities = await getOpportunitiesByUserId(user_id);

  if (!opportunities || opportunities.length < 1) {
    return (
      <>
        <Empty href="/opportunities" button={<CreateOpportunityModal />}>
          Looks like you haven't listed any opportunities yet.
        </Empty>
      </>
    );
  }

  return (
    <div className="h-full py-12 md:py-20">
      <Container>
        <div className="flex justify-between items-center mb-8">
          <Heading>Projects</Heading>
          <CreateOpportunityModal />
        </div>
        <ProjectsTabs opportunities={opportunities} />
      </Container>
    </div>
  );
};

export default ClientDashboard;
