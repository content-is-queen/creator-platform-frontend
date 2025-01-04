"use client";

import { useEffect, useState } from "react";
import API from "@/api/api";
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

const Applications = ({ id }) => {
  const { data: applications, isLoading: applicationsLoading } = useQuery({
    queryKey: ["application", id],
    queryFn: async () => {
      const q = query(
        collection(db, "applications"),
        where("opportunityId", "==", id)
      );

      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
    },
    enabled: !!id,
  });

  const getOpportunity = async () => {
    const snapshot = await getDoc(doc(db, "opportunities", id));

    return snapshot.data();
  };

  const { data: opportunity, isLoading } = useQuery({
    queryKey: ["opportunity", id],
    queryFn: getOpportunity,
    enabled: !!id,
  });

  console.log(opportunity);

  return (
    <div className="pt-28 pb-20">
      <Container className="space-y-2 text-center mb-12">
        <Heading>Applications</Heading>
      </Container>
      <Container className="grid md:grid-cols-2 gap-4">
        {!applicationsLoading && (
          <>
            {applications?.length > 0 ? (
              <>
                {applications.map((application) => (
                  <BrandApplicationCard
                    key={application.id}
                    opportunityTitle={opportunity?.title}
                    {...application}
                  />
                ))}
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
