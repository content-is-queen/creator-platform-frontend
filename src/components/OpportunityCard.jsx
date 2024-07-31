import parse from "html-react-parser";
import { stripHtml } from "string-strip-html";

import Card from "@/components/Card";
import Button from "@/components/Button";
import Text from "@/components/Text";
import Tag from "@/components/Tag";
import ProfileIcon from "./ProfileIcon";

const OpportunityCard = ({
  company,
  organizationName,
  compensation,
  salary,
  type,
  title,
  description,
  opportunityId,
  budget,
  profilePhoto,
  organizationLogo,
}) => {
  const pay = budget || compensation || salary;
  const MAX_CHARS = 200;
  const strippedDescription = stripHtml(description).result;
  const shortDescription =
    strippedDescription.length > MAX_CHARS
      ? `${strippedDescription.slice(0, MAX_CHARS)}...`
      : strippedDescription;

  return (
    <Card className="flex flex-col items-start">
      <div className="flex flex-row items-center gap-2.5 justify-between mb-5 w-full">
        <div className="flex gap-2 items-center">
          <ProfileIcon
            className="h-5 w-5"
            profilePhoto={organizationLogo || profilePhoto}
          />
          <span className="text-xs font-semibold text-queen-black uppercase rounded-full">
            {organizationName || company}
          </span>
        </div>
        <div>
          <div className="flex gap-x-1 flex-col md:flex-row">
            <Text as="span" size="sm">
              Compensation
            </Text>
            <Text
              as="span"
              size="sm"
              color="muted"
              className="max-w-26 truncate"
            >
              {pay || "To be discussed"}
            </Text>
          </div>
        </div>
      </div>
      <div className="mt-6 max-w-full">
        <div className="flex items-center mb-2">
          <Text
            className="mr-3 text-queen-black capitalize truncate"
            size="2xl"
          >
            {title}
          </Text>
          <Tag className="inline-block mt-0">{type}</Tag>
        </div>
        <Text color="muted" size="sm" className="mb-6 md:pr-8">
          {shortDescription}
        </Text>
        <Button variant="white" href={`/opportunities/${opportunityId}`}>
          View
        </Button>
      </div>
    </Card>
  );
};

export default OpportunityCard;
