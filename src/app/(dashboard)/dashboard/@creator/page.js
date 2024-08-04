import Button from "@/components/Button";
import Container from "@/components/Container";
import CreatorApplications from "@/components/Creator/CreatorApplications";
import CreatorStats from "@/components/Creator/CreatorStats";

const CreatorDashboard = () => {
  return (
    <>
      <div
        style={{
          minHeight: "calc(100vh - var(--nav-height))",
          backgroundSize: "500px",
          backgroundImage: "url('/images/CiQ_Pattern 4 lilac.svg')",
        }}
        className="flex justify-center items-center py-12 text-center bg-queen-blue bg-repeat-x bg-[center_bottom_-2rem]"
      >
        <Container className="space-y-12 pb-20">
          <CreatorStats />

          <Button href="/opportunities" variant="blue" size="lg">
            Explore opportunities
          </Button>
        </Container>
      </div>
      <CreatorApplications />
    </>
  );
};

export default CreatorDashboard;
