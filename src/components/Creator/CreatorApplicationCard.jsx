import { useEffect, useState } from "react";

import API from "@/api/api";

import Card from "@/components/Card";
import Tag from "@/components/Tag";
import ProfileIcon from "@/components/ProfileIcon";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";

const CreatorApplicationCard = ({ status, opportunity_id }) => {
  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getOpportunityById(id) {
      try {
        const response = await API(`/opportunities/opportunityid/${id}`);
        setOpportunity(response);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    getOpportunityById(opportunity_id);
  }, [opportunity_id]);

  return (
    <Card className="flex items-center justify-between">
      {loading ? (
        <LoadingPlaceholder />
      ) : (
        <>
          <div className="flex gap-x-6 items-center">
            <ProfileIcon />
            {opportunity?.title}
          </div>

          <Tag>{status}</Tag>
        </>
      )}
    </Card>
  );
};

export default CreatorApplicationCard;
