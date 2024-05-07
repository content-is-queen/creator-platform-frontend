"use server";

import API from "@/api/api";

import Card from "@/components/Card";
import Text from "@/components/Text";
import Button from "@/components/Button";
import Tag from "@/components/Tag";
import Heading from "../Heading";
import ProfileIcon from "../ProfileIcon";

async function getOpportunityById(id) {
  const response = await API(`/opportunities/opportunityid/${id}`);
  return response;
}
const CreatorApplicationCard = async ({ status, opportunity_id }) => {
  const { title } = await getOpportunityById(opportunity_id);

  return (
    <Card className="flex items-center justify-between">
      <div className="flex gap-x-6 items-center">
        <ProfileIcon />
        {title}
      </div>

      <Tag>{status}</Tag>
    </Card>
  );
};

export default CreatorApplicationCard;
