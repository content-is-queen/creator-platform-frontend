
// import OpportunitiesSearch from "@/components/Creator/OpportunitiesSearch";
// import Heading from "@/components/Heading";
// import Container from "@/components/Container";

import Container from "@/components/Container";
import OpportunitiesSearch from "@/components/Creator/OpportunitiesSearch";
import OpportunitiesSearchAdmin from "@/components/Creator/OpportunitiesSearchAdmin";
import Heading from "@/components/Heading";
import { getOpportunities } from "@/utils";

// import { getOpportunities } from "@/helpers/getServerComponentData";

const Opportunities = async () => {
  const opportunities = await getOpportunities();

  return (
    <Container className="mb-32">
      <OpportunitiesSearchAdmin opportunities={opportunities} />
    </Container>
  );
};

export default Opportunities;

