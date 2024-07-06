import OpportunitiesSearch from "@/components/Creator/OpportunitiesSearch";
import Heading from "@/components/Heading";
import Container from "@/components/Container";

const Opportunities = () => {
  return (
    <Container size="2xl" className="mb-32">
      <div className="text-center mt-24 mb-16">
        <Heading>Opportunities</Heading>
      </div>

      <OpportunitiesSearch />
    </Container>
  );
};

export default Opportunities;
