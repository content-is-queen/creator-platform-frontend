import Link from "next/link";

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
  profilePhoto,
  userId,
}) => (
  <Card className="flex flex-wrap md:block">
    <div className="flex flex-col md:flex-row items-start md:items-center gap-2.5 justify-between md:mb-4">
      <Link href={`/profile/${userId}`} className="flex gap-2 items-center">
        <ProfileIcon className="h-6 w-6" profilePhoto={profilePhoto} />
        <span className="text-xs font-semibold text-gray-900 dark:text-white uppercase rounded-full">
          {organizationName || company}
        </span>
      </Link>
      <div className="flex gap-y-2 gap-x-3 item-center flex-wrap basis-1/4 md:basis-auto">
        <div className="flex gap-x-1 flex-col md:flex-row">
          <Text as="span" size="sm">
            Compensation
          </Text>
          <Text
            as="span"
            size="sm"
            color="muted"
            className="max-w-26 md:max-w-none truncate"
          >
            {compensation || salary}
          </Text>
        </div>
      </div>
    </div>
    <div className="flex content-start items-start mb-4 -order-1 md:mb-2 md:items-center md:order-1">
      <p className="text-xl mr-3 text-queen-black capitalize">{title}</p>
      <Tag className="inline-block mt-1 md:mt-0">{type}</Tag>
    </div>

    <div className="flex justify-between items-center flex-row flex-wrap gap-y-4 w-full mt-6 md:mt-0">
      <Text
        color="muted"
        size="sm"
        className="hidden md:block w-full max-w-96 mr-2 truncate"
      >
        {description}
      </Text>

      <Button variant="white" href={`/opportunities/${opportunityId}`}>
        View
      </Button>
    </div>
  </Card>
);

export default OpportunityCard;
