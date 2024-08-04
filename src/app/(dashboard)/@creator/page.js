import { useQuery } from "@tanstack/react-query";

import Button from "@/components/Button";
import Container from "@/components/Container";
import StatsPanel from "@/components/StatsPanel";
import Section from "@/components/Section";
import Text from "@/components/Text";
import LoadingPlaceholder from "../LoadingPlaceholder";
import CreatorApplicationCard from "@/components/Creator/CreatorApplicationCard";

import API from "@/api/api";
import { useUser } from "@/context/UserContext";

const CreatorDashboard = () => {
  const { user } = useUser();

  const { isPending, data: applications } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const { data } = await API.get(`applications/user/${user.uid}`);
      return data.message;
    },
  });

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
          {isPending ? (
            <div className="mx-auto w-72 flex items-center justify-center flex-wrap md:flex-nowrap">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-queen-white shadow-lg text-center rounded-full text-queen-black shrink-0 inline-flex w-1/2 pb-[50%] relative border-queen-blue border"
                >
                  <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="max-w-20">
                      <LoadingPlaceholder.Bar dark />
                    </div>
                    <div className="max-w-10">
                      <LoadingPlaceholder.Bar dark />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <StatsPanel applications={applications} />
          )}

          <Button href="/opportunities" variant="blue" size="lg">
            Explore opportunities
          </Button>
        </Container>
      </div>
      {applications?.length > 0 && (
        <Section size="4xl" className="bg-queen-white">
          <Text size="xl" className="mb-8">
            Applications
          </Text>

          <div className="grid md:grid-cols-2 gap-4">
            {applications.map((application) => (
              <CreatorApplicationCard
                key={application.applicationId}
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
