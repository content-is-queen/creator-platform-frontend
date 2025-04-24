import OpportunitiesSearch from "@/components/Creator/OpportunitiesSearch";
import Container from "@/components/Container";

const Opportunities = () => {
  return (
    <Container size="2xl" className="pt-8 mb-p2">
      <OpportunitiesSearch />
    </Container>
  );
};

export default Opportunities;

export const metadata = {
  title: "Opportunities",
};
