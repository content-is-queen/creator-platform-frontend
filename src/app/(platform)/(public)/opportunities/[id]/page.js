"use client";

import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/firebase.config";

import API from "@/api/api";

import Container from "@/components/Container";
import ApplicationProposalForm from "@/components/Creator/ApplicationProposalForm";
import Job from "@/components/Opportunities/Job";
import Campaign from "@/components/Opportunities/Campaign";
import Pitch from "@/components/Opportunities/Pitch";
import ButtonExternal from "@/components/ButtonExternal";
import BackButton from "@/components/BackButton";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/Spinner";

const Page = () => {
  const { id: opportunityId } = useParams();

  const getOpportunity = async () => {
    const snapshot = await getDoc(doc(db, "opportunities", opportunityId));

    return snapshot.data();
  };

  const { data, isLoading } = useQuery({
    queryKey: ["opportunity", opportunityId],
    queryFn: getOpportunity,
    enabled: !!opportunityId,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center pt-20 fixed h-[calc(100vh_-_80px)] w-screen">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }
  if (!data) {
    return notFound();
  }

  let Component = Pitch;

  switch (data.type) {
    case "pitch":
      Component = Pitch;
      break;
    case "job":
      Component = Job;
      break;
    case "campaign":
      Component = Campaign;
      break;
  }

  return (
    <div className="relative bg-white bg-lilac-dots bg-repeat-x bg-[center_bottom_-2.5rem]">
      <Container size="2xl">
        <div className="pt-20 pb-72 space-y-12">
          <div className="space-y-8">
            <BackButton />

            <Component {...data} />
          </div>

          {data?.link ? (
            <ButtonExternal link={data.link} />
          ) : (
            <ApplicationProposalForm
              opportunityId={opportunityId}
              applicationInstructions={data.applicationInstructions}
              authorId={data.userId}
            />
          )}
        </div>
      </Container>
    </div>
  );
};

// export async function generateMetadata({ params }) {
//   const {
//     data: { title },
//   } = await API(`/opportunities/opportunityid/${params.id}`);
//
//   return {
//     title: `${title} | Opportunity`,
//   };
// }

export default Page;
