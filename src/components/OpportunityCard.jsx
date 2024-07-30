import parse from "html-react-parser";

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
  opportunityId,
  budget,
  profilePhoto,
  organizationLogo,
}) => {
  const pay = budget || compensation || salary;
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
      <div className="flex mb-2 items-center">
        <p className="text-lg mr-3 text-queen-black capitalize max-w-4xl truncate">
          {title}
        </p>
        <Tag className="inline-block mt-0">{type}</Tag>
      </div>

      <Button
        variant="white"
        href={`/opportunities/${opportunityId}`}
        className="mt-6"
      >
        View
      </Button>
    </Card>
  );
};

export default OpportunityCard;
