"use client";

import API from "@/api/api";
import { useQuery } from "@tanstack/react-query";

import OpportunityCard from "@/components/OpportunityCard";
import Spinner from "../Spinner";
import Text from "../Text";
import Container from "@/components/Container";
import Heading from "@/components/Heading";

const OpportunitiesSearch = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["opportunities"],
    queryFn: async () => {
      const { data } = await API.get(`/opportunities`);
      return data.message.opportunities;
    },
  });

  return (
    <>
      {isLoading ? (
        <div className="text-center flex items-center justify-center h-44">
          <Spinner className="h-8 w-8 mt-5 inline-block" />
        </div>
      ) : (
        <div className="py-12 space-y-4 min-h-80">
          {data.length > 0 ? (
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
