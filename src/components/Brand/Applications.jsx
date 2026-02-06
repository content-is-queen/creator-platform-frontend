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
import SpinnerScreen from "@/components/SpinnerScreen";

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

  if (!opportunity) {
    return <SpinnerScreen />;
  }

  return (
    <div className="grid grid-cols-6 gap-4 pt-16 pb-20">
      <div className="col-span-2 bg-card">
        <Container>
          <Heading size="2xl">{opportunity.title}</Heading>
        </Container>
      </div>
      <div className="col-span-4">
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
    </div>
  );
};

export default Applications;
