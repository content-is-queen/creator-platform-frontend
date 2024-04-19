import { Suspense } from "react";

import API from "@/api/api";

import Button from "@/components/Button";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import StatsPanel from "@/components/StatsPanel";
import Spinner from "@/components/Spinner";
import Section from "@/components/Section";
import Text from "@/components/Text";
import CreatorApplicationCard from "@/components/Creator/CreatorApplicationCard";

const getApplicationsByUserId = async (id) => {
  try {
    const res = await API.get("/applications");
    return res.data.message.filter((i) => i.user_id === id);
  } catch (error) {
    throw new Error("Something went wrong when trying to get the applications");
  }
};

const CreatorDashboard = async ({ user: { user_id, name } }) => {
  const applications = await getApplicationsByUserId(user_id);

  // Application stats
  const proposals = applications.length;
  const inProgress = applications.filter((i) => i.status === "accepted").length;

  const STATS = [
    { name: "proposals", value: proposals },
    { name: "in_progress", value: inProgress },
    { name: "in_review", value: 0 },
    { name: "completed", value: 0 },
  ];

  return (
    <>
      <div
        style={{ minHeight: "calc(100vh - var(--nav-height))" }}
        className="flex justify-center items-center py-12 text-center md:py-20 bg-queen-blue bg-orange-dots bg-repeat-x bg-[center_bottom_-4rem]"
      >
        <Container className="space-y-4 pb-20">
          <Heading className="text-queen-white mb-12">Welcome</Heading>
          {!applications || applications.length > 0 ? (
            <StatsPanel stats={STATS} />
          ) : (
            <div className="space-y-6 max-w-lg text-queen-white">
              <p>
                It looks like you haven’t applied for any opportunities yet. Why
                don’t you check out the latest opportunities.
              </p>
              <Button variant="yellow" href="/opportunities">
                View opportunities
              </Button>
            </div>
          )}
        </Container>
      </div>
      {applications.length > 0 && (
        <Section size="4xl">
          <Text size="xl" className="mb-8">
            Applications
          </Text>

          <div className="grid grid-cols-2 gap-4">
            {applications.map((application) => (
              <CreatorApplicationCard
                key={application.application_id}
                {...application}
              />
            ))}
          </div>
        </Section>
      )}
    </>
  );
};

export default CreatorDashboard;
