"use client";

import { useQuery } from "@tanstack/react-query";
import API from "@/api/api";
import { useUser } from "@/context/UserContext";

import CreatorApplicationCard from "@/components/Creator/CreatorApplicationCard";
import Section from "@/components/Section";
import Text from "@/components/Text";

const CreatorApplications = () => {
  const { user } = useUser();

  const { data: applications } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const { data } = await API.get(`applications/user/${user.uid}`);
      return data.message;
    },
  });
  return (
    applications?.length > 0 && (
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
    )
  );
};

export default CreatorApplications;
