import Heading from "@/components/Heading";
import MainNav from "@/components/MainNav";
import Container from "@/components/Container";
import Search from "@/components/Search";

const TAGS = ["pitch", "broadcasting", "business", "publishing"];

const EditProfile = () => (
  <div>
    <MainNav />
    <Container size="2xl">
      <div className="text-center mt-20 mb-16">
        <Heading>Profile</Heading>
      </div>
      <Search tags={TAGS} />
    </Container>
  </div>
);

export default EditProfile;
