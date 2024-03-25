import MainNav from "@/components/MainNav";
import Container from "@/components/Container";
import Text from "@/components/Text";
import OpportunityCard from "@/components/OpportunityCard";
import Button from "@/components/Button";
import Panel from "@/components/Panel";
import Heading from "@/components/Heading";
import StatsPanel from "../StatsPanel";

const CreatorDashboard = ({ userProfile }) => {
  const opportunities = [];

  return (
    <>
      <MainNav />
      <div className="bg-queen-white h-full py-12 md:py-20">
        <Container>
          <Heading>Welcome back, {userProfile?.name}</Heading>
          <div className="grid gap-8 md:grid-cols-6">
            <div className="pt-2 pl-0 md:col-span-4">
              <Text size="xl" className="mb-4">
                Recommended opportunities for you
              </Text>
              <ul className="grid gap-2">
                {opportunities?.map((opportunity, index) => (
                  <li key={`${opportunity.title}-${index}`} className="pt-4">
                    <OpportunityCard {...opportunity} />
                  </li>
                ))}
              </ul>
              <Button href="/opportunities" className="mt-16">
                View all opportunities
              </Button>
            </div>
            <div className="grid gap-8 md:col-span-2">
              <StatsPanel />
              <Panel title="Most Recent Chat"></Panel>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default CreatorDashboard;
