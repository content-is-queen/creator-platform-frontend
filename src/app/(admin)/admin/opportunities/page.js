import Container from "@/components/Container";
import OpportunitiesSearchAdmin from "@/components/Creator/OpportunitiesSearchAdmin";
import { getOpportunities } from "@/utils";

const Opportunities = async () => {
  const opportunities = await getOpportunities();

  return (
    <Container className="mb-32">
      <OpportunitiesSearchAdmin opportunities={opportunities} />
    </Container>
  );
};

export default Opportunities;
