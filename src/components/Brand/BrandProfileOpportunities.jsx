"use client";

import { useQuery } from "@tanstack/react-query";
import API from "@/api/api";

import Section from "@/components/Section";
import Text from "@/components/Text";
import Spinner from "../Spinner";
import OpportunityCard from "../OpportunityCard";

const BrandProfileOpportunities = ({ user: { uid } }) => {
  const {
    isPending,
    data: opportunities,
    error,
  } = useQuery({
    queryKey: ["opportunities"],
    queryFn: async () => {
      const { data } = await API.get(`/opportunities/id/${uid}`);
      return data.opportunities;
    },
  });

  return (
    <Section size="4xl">
      <Text size="xl" className="mb-8">
        Opportunities
      </Text>
      {isPending ? (
        <div className="flex items-center justify-center">
          <Spinner className="h-6 w-6" />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {opportunities?.length > 0 ? (
            opportunities.map((opportunity) => (
              <OpportunityCard
                key={opportunity.opportunityId}
                {...opportunity}
              />
            ))
          ) : (
            <p>No opportunities</p>
          )}
        </div>
      )}
    </Section>
  );
};

export default BrandProfileOpportunities;
