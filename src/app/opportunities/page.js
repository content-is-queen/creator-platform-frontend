import Heading from "@/components/Heading";
import MainNav from "@/components/MainNav";
import Container from "@/components/Container";
import Search from "@/components/Search";

const TAGS = ["pitch", "broadcasting", "business", "publishing"];

const Opportunities = () => (
  <div>
    <MainNav />
    <Container size="lg">
      <div className="text-center mt-20 mb-16">
        <Heading>Opportunities</Heading>
      </div>
      <Search tags={TAGS} />
    </Container>
  </div>
);

export default Opportunities;
