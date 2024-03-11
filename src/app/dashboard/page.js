import MainNav from "@/components/MainNav";
import Heading from "@/components/Heading";
import Container from "@/components/Container";
import Text from "@/components/Text";
import OpportunityCard from "@/components/OpportunityCard";
import Button from "@/components/Button";
import Panel from "@/components/Panel";

const OPPORTUNITIES = [
  {
    company: {
      name: "The Guardian",
      image: { src: "/images/guardian.png" },
      profileUrl: "/#",
    },
    title: "Marketing email",
    budget: "Under 1k",
    deadline: "2 Mar 2024",
    href: "/#",
    type: "Pitch",
    excerpt:
      "‘Think: Sustainability’ is a podcast about practical solutions for a bette.....",
  },
  {
    company: {
      name: "The Guardian",
      image: { src: "/images/guardian.png" },
      profileUrl: "/#",
    },
    title: "Marketing email",
    budget: "Under 1k",
    deadline: "2 Mar 2024",
    href: "/#",
    type: "Pitch",
    excerpt:
      "‘Think: Sustainability’ is a podcast about practical solutions for a bette.....",
  },
  {
    company: {
      name: "The Guardian",
      image: { src: "/images/guardian.png" },
      profileUrl: "/#",
    },
    title: "Marketing email",
    budget: "Under 1k",
    deadline: "2 Mar 2024",
    href: "/#",
    type: "Pitch",
    excerpt:
      "‘Think: Sustainability’ is a podcast about practical solutions for a bette.....",
  },
];

const Dashboard = () => (
  <main>
    <MainNav />
    <div className="bg-queen-white h-full py-12 md:py-20">
      <Container>
        <Heading>Welcome back, Kaleshe</Heading>
        <div className="grid gap-8 md:grid-cols-6">
          <div className="pt-2 pl-0 md:col-span-4">
            <Text size="xl" className="mb-4">
              Recommended opportunities for you
            </Text>
            <ul className="grid gap-2">
              {OPPORTUNITIES?.map((opportunity, index) => (
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
            <Panel title="Overview"></Panel>
            <Panel title="Most Recent Chat"></Panel>
          </div>
        </div>
      </Container>
    </div>
  </main>
);

export default Dashboard;
