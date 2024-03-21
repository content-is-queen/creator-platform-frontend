import MainNav from "@/components/MainNav";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ProjectsTabs from "@/components/Client/ProjectsTabs";
import Button from "@/components/Button";

const ClientDashboard = ({ userProfile }) => {
  // TODO: get opportunites from API

  const opportunities = [
    {
      status: "in_progress",
      title: "Email Marketing",
      type: "Pitch",
      budget: "less than £500",
      deadline: "2 Mar 2024",
    },
    {
      status: "live",
      title: "Podcast Editor",
      type: "Job",
      budget: "2k",
      deadline: "5 Mar 2024",
    },
    {
      status: "in_progress",
      title: "Manager",
      type: "Job",
      budget: "Under 5k",
      deadline: "6 April 2024",
    },
    {
      status: "completed",
      title: "Drop in guest",
      type: "Pitch",
      budget: "£200",
      deadline: "5 June 2024",
    },
  ];

  return (
    <>
      <MainNav />
      <div className="bg-queen-white h-full py-12 md:py-20">
        <Container>
          <div className="flex justify-between align-middle items-center space-y-16">
            <Heading>Projects</Heading>
            <Button type="button" tag="button">
              Create Opportunity
            </Button>
          </div>
          <ProjectsTabs opportunities={opportunities} />
        </Container>
      </div>
    </>
  );
};

export default ClientDashboard;
