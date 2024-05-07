import { Suspense, useEffect, useState } from "react";

import Button from "@/components/Button";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import StatsPanel from "@/components/StatsPanel";
import Section from "@/components/Section";
import Text from "@/components/Text";
import CreatorApplicationCard from "@/components/Creator/CreatorApplicationCard";

import API from "@/api/api";
import { useUser } from "@/context/UserContext";
import Spinner from "../Spinner";

const CreatorDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    (async () => {
      const res = await API("/applications");
      setApplications(res.message.filter((i) => i.user_id === user.uid));
      setIsloading(false);
    })();
  }, []);

  return (
    <>
      <div
        style={{ minHeight: "calc(100vh - var(--nav-height))" }}
        className="flex justify-center items-center py-12 text-center md:py-20 bg-queen-blue bg-purple-dots bg-repeat-x bg-[center_bottom_-4rem]"
      >
        <Container className="space-y-4 pb-20">
          <Heading className="text-queen-white mb-12">Overview</Heading>

          <StatsPanel isLoading={isLoading} applications={applications} />

          {!isLoading && applications.length < 1 && (
            <div className="space-y-6 max-w-lg text-queen-white py-20">
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
      <Suspense fallback={<Spinner />}>
        {applications && applications.length > 0 && (
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
      </Suspense>
    </>
  );
};

export default CreatorDashboard;

CreatorDashboard.role = "creator";
