import Link from "next/link";

import Card from "@/components/Card";
import Button from "@/components/Button";
import Text from "@/components/Text";
import Tag from "@/components/Tag";
import ProfileIcon from "./ProfileIcon";

const OpportunityCard = ({
  company,
  compensation,
  deadline,
  type,
  title,
  description,
  opportunity_id,
}) => (
  <Card>
    <div className="flex items-center gap-2.5 justify-between mb-4">
      <Link href="" className="flex items-center">
        <ProfileIcon />
        <span className="text-xs font-semibold text-gray-900 dark:text-white uppercase rounded-full">
          {company?.name}
        </span>
      </Link>
      <div className="flex gap-y-2 gap-x-6 item-center">
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
    <div className="flex content-start items-center mb-2">
      <p className="text-xl mr-3 text-queen-black capitalize">{title}</p>
      <Tag>{type}</Tag>
    </div>

    <div className="flex justify-between items-center">
      <div className="max-w-sm">
        <Text color="muted" className="truncate">
          {description}
        </Text>
      </div>

      <Button variant="white" href={`/opportunities/${opportunity_id}`}>
        View
      </Button>
    </div>
  </Card>
);

export default OpportunityCard;
