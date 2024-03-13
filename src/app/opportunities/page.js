import Heading from "@/components/Heading";
import MainNav from "@/components/MainNav";
import Container from "@/components/Container";

const TAGS = ["pitch", "broadcasting", "business", "publishing"];

const Opportunities = () => (
  <div>
    <MainNav />
    <Container size="2xl">
      <div className="text-center mt-20 mb-16">
        <Heading>Opportunities</Heading>
      </div>
    </Container>
  </div>
);

export default Opportunities;
