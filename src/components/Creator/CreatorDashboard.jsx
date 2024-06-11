import { useEffect, useState } from "react";

import Button from "@/components/Button";
import Container from "@/components/Container";
import StatsPanel from "@/components/StatsPanel";
import Section from "@/components/Section";
import Text from "@/components/Text";
import CreatorApplicationCard from "@/components/Creator/CreatorApplicationCard";

import API from "@/api/api";
import { useUser } from "@/context/UserContext";

const CreatorDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setloading] = useState(true);

  const { user } = useUser();

  useEffect(() => {
    async function getApplications() {
      try {
        const { data } = await API.get("/applications");
        setApplications(data.message.filter((i) => i.user_id === user.uid));
      } catch (err) {
        console.error(err);
      } finally {
        setloading(false);
      }
    }

    getApplications();
  }, []);

  return (
    <>
      <div
        style={{ minHeight: "calc(100vh - var(--nav-height))" }}
        className="flex justify-center items-center py-12 text-center md:py-32 bg-queen-blue bg-lilac-dots bg-repeat-x bg-[center_bottom_-4rem]"
      >
        <Container className="space-y-4 pb-20">
          <StatsPanel loading={loading} applications={applications} />

          {!loading && applications.length < 1 && (
            <div className="space-y-6 max-w-md text-queen-white pt-10 pb-20 md:pb-0">
              <Text size="lg" className="leading-6">
                It looks like you haven’t applied for any opportunities yet.{" "}
                <br /> Why don’t you check out our latest opportunities.
              </Text>
              <Button variant="yellow" href="/opportunities" size="lg">
                Get started
              </Button>
            </div>
          )}
        </Container>
      </div>
      {applications && applications.length > 0 && (
        <Section size="4xl">
          <Text size="xl" className="mb-8">
            Applications
          </Text>

          <div className="grid md:grid-cols-2 gap-4">
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

CreatorDashboard.roles = ["creator"];
