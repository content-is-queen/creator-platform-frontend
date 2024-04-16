import API from "@/api/api";

import OpportunitiesSearch from "@/components/Creator/OpportunitiesSearch";
import Heading from "@/components/Heading";
import Container from "@/components/Container";

async function getOpportunities() {
  // Prevent build failing during workflows build test
  if (process.env.APP_ENV === "development") {
    return [];
  }

  try {
    const res = await API.get("/opportunities");
    return res.data.message;
  } catch (error) {
    throw new Error("Something went wrong with getting opportunities");
  }
}

const Opportunities = async () => {
  const opportunities = await getOpportunities();

  return (
    <Container size="2xl">
      <div className="text-center mt-20 mb-16">
        <Heading>Opportunities</Heading>
      </div>

      <OpportunitiesSearch opportunities={opportunities} />
    </Container>
  );
};

export default Opportunities;
