"use client";

import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/context/UserContext";

import CreatorApplicationCard from "@/components/Creator/CreatorApplicationCard";
import Section from "@/components/Section";
import Text from "@/components/Text";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase.config";

const CreatorApplications = () => {
  const { user } = useUser();

  const userId = user?.uid;

  const { data: applications } = useQuery({
    queryKey: ["application", userId],
    queryFn: async () => {
      const q = query(
        collection(db, "applications"),
        where("creatorId", "==", userId)
      );

      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
    },
    enabled: !!userId,
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
