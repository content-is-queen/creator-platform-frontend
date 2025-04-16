import { stripHtml } from "string-strip-html";
import Link from "next/link";

import Card from "@/components/Card";
import Text from "@/components/Text";
import Tag from "@/components/Tag";
import ProfileIcon from "./ProfileIcon";
import { usePathname } from "next/navigation";

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
}) => {
  const pathname = usePathname();
  const pay = budget || compensation || salary;
  const MAX_CHARS = 275;
  const strippedDescription = stripHtml(description).result;
  const shortDescription =
    strippedDescription.length > MAX_CHARS
      ? `${strippedDescription.slice(0, MAX_CHARS)}...`
      : strippedDescription;
  const featured = company?.toUpperCase() === "CONTENT IS QUEEN";

  return (
    <Card className="relative flex flex-col items-start">
      <div className="mt-2 max-w-full">
        <div className="flex items-center mb-3">
          <Link
            className="mr-3 text-queen-black text-xl truncate hover:underline after:absolute after:left-0 after:top-0 after:w-full after:h-full"
            href={`/opportunities/${opportunityId}`}
          >
            {title}
          </Link>
        </div>
        <div className="flex items-center gap-1 mb-4">
          {featured && <Tag color="blue">Featured</Tag>}
          <Tag>{type}</Tag>
          {pay ? (
            <Tag color="lilac">
              <span className="sr-only">Budget </span>
              {pay}
            </Tag>
          ) : null}
        </div>
        <Text color="muted" size="sm" className="mb-6 md:pr-8">
          {shortDescription}
        </Text>
      </div>
      {Boolean(organizationName || (company && pathname !== "/profile")) ? (
        <div className="mt-2 w-full flex flex-row items-center gap-2.5 justify-end w-full">
          <span className="text-xs font-semibold text-queen-black uppercase rounded-full">
            Posted by {organizationName || company}
          </span>
        </div>
      ) : null}
    </Card>
  );
};

export default OpportunityCard;
