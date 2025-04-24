"use client";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import Text from "@/components/Text";
import BrandApplicationCard from "@/components/Brand/BrandApplicationCard";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase.config";
import { useQuery } from "@tanstack/react-query";
import ApplicationTable from "@/components/ApplicationTable";

const Applications = ({ id }) => {
  const getApplicant = async (id) => {
    const snapshot = await getDoc(doc(db, "users", id));

    return snapshot.data();
  };

  const { data: applications, isLoading: applicationsLoading } = useQuery({
    queryKey: ["application", id],
    queryFn: async () => {
      const q = query(
        collection(db, "applications"),
        where("opportunityId", "==", id)
      );

      const querySnapshot = await getDocs(q);

      return await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const { creatorId, ...rest } = doc.data();
          try {
            const applicant = await getApplicant(creatorId);
            return {
              ...rest,
              ...applicant,
              creatorId,
              id: doc.id,
            };
          } catch (error) {
            console.error(error);
          }
        })
      );
    },
    enabled: !!id,
  });

  const getOpportunity = async () => {
    const snapshot = await getDoc(doc(db, "opportunities", id));

    return snapshot.data();
  };

  const { data: opportunity } = useQuery({
    queryKey: ["opportunity", id],
    queryFn: getOpportunity,
    enabled: !!id,
  });

  return (
    <div className="pt-28 pb-20">
      <Container className="space-y-2 text-center mb-12">
        <Heading>Applications</Heading>
      </Container>
      <Container>
        {!applicationsLoading && (
          <>
            {applications?.length > 0 ? (
              <>
                <ApplicationTable applications={applications} />
                <div className="pt-20 grid md:grid-cols-2 gap-4">
                  {applications.map((application) => (
                    <BrandApplicationCard
                      key={application.id}
                      opportunityTitle={opportunity?.title}
                      {...application}
                    />
                  ))}
                </div>
              </>
            ) : (
              <Text>No applications</Text>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default Applications;
