"use client";

import useOpportunities from "@/hooks/useOpportunities";

import Section from "@/components/Section";
import Text from "@/components/Text";
import Card from "@/components/Card";
import Tag from "@/components/Tag";
import Button from "@/components/Button";
import Spinner from "../Spinner";
import OpportunityCard from "../OpportunityCard";

const BrandProfileOpportunities = ({ user: { uid } }) => {
  const { opportunities, setOpportunities, loading } = useOpportunities({
    userId: uid,
  });

  return (
    <Section size="4xl">
      <Text size="xl" className="mb-8">
        Opportunities
      </Text>
      {loading ? (
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
