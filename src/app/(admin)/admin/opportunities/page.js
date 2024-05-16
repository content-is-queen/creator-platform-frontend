import Container from "@/components/Container";
import OpportunitiesSearchAdmin from "@/components/Creator/OpportunitiesSearchAdmin";
import { getOpportunities } from "@/utils";

const Opportunities = async () => {


  return (
    <Container className="mb-32">
      <OpportunitiesSearchAdmin />
    </Container>
  );
};

export default Opportunities;
