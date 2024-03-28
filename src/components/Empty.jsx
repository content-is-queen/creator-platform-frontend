import Heading from "@/components/Heading";
import Container from "@/components/Container";

const Empty = ({ children, button }) => (
  <div
    style={{ height: "calc(100vh - var(--nav-height))" }}
    className="flex justify-center items-center py-12 text-center md:py-20 bg-purple-dots bg-repeat-x bg-[center_bottom_-4rem]"
  >
    <Container className="space-y-4 pb-20">
      <Heading>Welcome</Heading>
      <div className="space-y-6">
        <p>{children}</p>
        {button}
      </div>
    </Container>
  </div>
);

export default Empty;
