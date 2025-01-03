"use client";

import { useQuery } from "@tanstack/react-query";
import { db } from "@/firebase.config";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

import OpportunityCard from "@/components/OpportunityCard";
import Spinner from "../Spinner";
import Text from "../Text";
import Container from "@/components/Container";
import Heading from "@/components/Heading";

const OpportunitiesSearch = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["opportunities"],
    queryFn: async () => {
      const formattedDate = new Intl.DateTimeFormat("en-CA")
        .format(new Date())
        .replace(/-/g, "/");

      const q = query(
        collection(db, "opportunities"),
        where("status", "!=", "archived")
      );

      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
    },
  });

  console.log(data);

  return (
    <>
      {isLoading ? (
        <div className="text-center flex items-center justify-center h-44">
          <Spinner className="h-8 w-8 mt-5 inline-block" />
        </div>
      ) : (
        <div className="py-12 space-y-4 min-h-80">
          {data?.length > 0 ? (
            <>
              {data.map((opportunity) => (
                <div key={opportunity.opportunityId}>
                  <OpportunityCard {...opportunity} />
                </div>
              ))}
            </>
          ) : (
            <Container size="6xl" className="mt-10 text-center space-y-6">
              <Heading>Opportunities</Heading>
              <Text className="text-center" size="xl">
                There are currently no open opportunities
              </Text>
            </Container>
          )}
        </div>
      )}
    </>
  );
};

export default OpportunitiesSearch;
