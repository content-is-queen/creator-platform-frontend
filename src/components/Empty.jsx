import Heading from "@/components/Heading";
import Container from "@/components/Container";

const Empty = ({ children, button }) => (
  <div
    style={{ height: "calc(100vh - var(--nav-height) - 54px)" }}
    className="flex justify-center items-center py-12 text-center md:py-20"
  >
    <Container className="space-y-4">
      <Heading>Welcome</Heading>
      <div className="space-y-6">
        <p>{children}</p>
        {button}
      </div>
    </Container>
  </div>
);

export default Empty;
