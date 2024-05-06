"use client";

import { useState, useEffect } from "react";

import Section from "@/components/Section";
import Text from "@/components/Text";
import Card from "@/components/Card";
import Tag from "@/components/Tag";
import Button from "@/components/Button";

import { getOpportunitiesByUserId } from "@/helpers/getServerComponentData";

const ProfileOpportunities = ({ uid }) => {
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    (async () => {
      setOpportunities(await getOpportunitiesByUserId(uid));
    })();
  }, [uid]);

  return (
    <Section size="4xl">
      <Text size="xl" className="mb-8">
        Opportunities
      </Text>
      <div className="grid grid-cols-2 gap-4">
        {opportunities.length > 0 ? (
          opportunities.map(
            ({ title, compensation, deadline, type, opportunity_id }) => (
              <Card
                key={opportunity_id}
                className="flex items-center justify-between col-span-full"
              >
                <div className="flex items-center gap-x-8">
                  <div className="flex content-start items-center">
                    <p className="text-lg mr-3 text-queen-black capitalize">
                      {title}
                    </p>
                    <Tag>{type}</Tag>
                  </div>
                  <div className="flex gap-x-6">
                    <div className="flex gap-x-2">
                      <Text as="span" size="sm">
                        Compensation
                      </Text>
                      <Text as="span" size="sm" color="muted">
                        {compensation}
                      </Text>
                    </div>
                    <div className="flex gap-x-2">
                      <Text as="span" size="sm">
                        Deadline
                      </Text>
                      <Text as="span" size="sm" color="muted">
                        {deadline}
                      </Text>
                    </div>
                  </div>
                </div>
                <Button
                  variant="white"
                  href={`/opportunities/${opportunity_id}`}
                >
                  View
                </Button>
              </Card>
            )
          )
        ) : (
          <p>No opportunities</p>
        )}
      </div>
    </Section>
  );
};

export default ProfileOpportunities;
