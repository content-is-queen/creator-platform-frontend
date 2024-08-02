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
  profilePhoto,
  organizationLogo,
}) => {
  const pathname = usePathname();
  const pay = budget || compensation || salary;
  const MAX_CHARS = 200;
  const strippedDescription = stripHtml(description).result;
  const shortDescription =
    strippedDescription.length > MAX_CHARS
      ? `${strippedDescription.slice(0, MAX_CHARS)}...`
      : strippedDescription;

  return (
    <Card className="relative flex flex-col items-start">
      <div className="flex flex-row items-center gap-2.5 justify-between mb-5 w-full">
        {pathname !== "/profile" ? (
          <div className="flex gap-2 items-center">
            <ProfileIcon
              className="h-5 w-5"
              profilePhoto={organizationLogo || profilePhoto}
            />
            <span className="text-xs font-semibold text-queen-black uppercase rounded-full">
              {organizationName || company}
            </span>
          </div>
        ) : null}
        <div></div>
      </div>
      <div className="mt-6 max-w-full">
        <div className="flex items-center mb-2">
          <Link
            className="mr-3 text-queen-black text-xl truncate hover:underline after:absolute after:left-0 after:top-0 after:w-full after:h-full"
            href={`/opportunities/${opportunityId}`}
          >
            {title}
          </Link>
          <div className="flex items-center gap-1">
            <Tag>{type}</Tag>{" "}
            {pay ? (
              <Tag color="lilac">
                <span className="sr-only">Budget </span>
                {pay}
              </Tag>
            ) : null}
          </div>
        </div>
        <Text color="muted" size="sm" className="mb-6 md:pr-8">
          {shortDescription}
        </Text>
      </div>
    </Card>
  );
};

export default OpportunityCard;
