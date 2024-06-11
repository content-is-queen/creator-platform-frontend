"use client";

import useOpportunities from "@/hooks/useOpportunities";

import Section from "@/components/Section";
import Text from "@/components/Text";
import Card from "@/components/Card";
import Tag from "@/components/Tag";
import Button from "@/components/Button";
import Spinner from "../Spinner";

const BrandProfileOpportunities = ({ user: { uid } }) => {
  const { opportunities, setOpportunities, loading } = useOpportunities({
    user_id: uid,
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
            opportunities.map(
              ({ title, compensation, deadline, type, opportunity_id }) => (
                <Card
                  key={opportunity_id}
                  className="flex items-center justify-between col-span-full"
                >
                  <div className="grid grid-cols-12 w-full gap-x-6">
                    <div className="col-span-4 flex gap-3 content-start items-center">
                      <p className="truncate max-w-80 text-queen-black capitalize">
                        {title}
                      </p>
                      <Tag>{type}</Tag>
                    </div>
                    <div className="col-span-6 flex items-center gap-x-6 justify-end">
                      <div className="flex gap-x-2">
                        <Text as="span" size="sm">
                          Compensation
                        </Text>
                        <Text as="span" size="sm" color="muted">
                          {compensation}
                        </Text>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <Button
                        variant="white"
                        href={`/opportunities/${opportunity_id}`}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                </Card>
              )
            )
          ) : (
            <p>No opportunities</p>
          )}
        </div>
      )}
    </Section>
  );
};

export default BrandProfileOpportunities;
