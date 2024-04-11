import API from "@/api/api";

import Heading from "@/components/Heading";
import Container from "@/components/Container";
import Search from "@/components/Search";
import OpportunityCard from "@/components/OpportunityCard";

const TAGS = ["pitch", "campaign", "job"];

async function getData() {
  // Prevent build failing during workflows build test
  if (process.env.APP_ENV === "development") {
    return [];
  }

  const res = await API.get("/opportunities");

  if (!res.status === 200) {
    throw new Error("Failed to fetch data");
  }

  return res.data.message;
}

const Opportunities = async () => {
  const data = await getData();

  return (
    <Container size="2xl">
      <div className="text-center mt-20 mb-16">
        <Heading>Opportunities</Heading>
      </div>
      <Search tags={TAGS} />

      <div className="my-12 space-y-6">
        {data.map((opportunity) => (
          <OpportunityCard key={opportunity.opportunity_id} {...opportunity} />
        ))}
      </div>
    </Container>
  );
};

export default Opportunities;
