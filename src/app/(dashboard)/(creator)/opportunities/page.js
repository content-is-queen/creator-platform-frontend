import OpportunitiesSearch from "@/components/Creator/OpportunitiesSearch";
import Heading from "@/components/Heading";
import Container from "@/components/Container";

import { getOpportunities } from "@/helpers/getServerComponentData";

const Opportunities = async () => {
  const opportunities = await getOpportunities();

  return (
    <Container size="2xl" className="mb-32">
      <div className="text-center mt-24 mb-16">
        <Heading>Opportunities</Heading>
      </div>

      <OpportunitiesSearch opportunities={opportunities} />
    </Container>
  );
};

export default Opportunities;
