import API from "@/api/api";

import Card from "@/components/Card";
import Text from "@/components/Text";
import Button from "@/components/Button";
import Tag from "@/components/Tag";
import Heading from "../Heading";
import ProfileIcon from "../ProfileIcon";

// async function getOpportunityById(id) {
//   try {
//     const res = await API.get(`/opportunities/opportunityid/${id}`);
//     return res.data;
//   } catch (error) {
//     throw new Error("Something went wrong when getting the opportunity");
//   }
// }
const CreatorApplicationCard = async ({ status }) => {
  // const { title, type, deadline } = getOpportunityById(opportunity_id);

  return (
    <Card className="flex items-center justify-between">
      <ProfileIcon />

      <Tag>{status}</Tag>
    </Card>
  );
};

export default CreatorApplicationCard;
