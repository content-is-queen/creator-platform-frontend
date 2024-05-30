import API from "@/api/api";

import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import Heading from "@/components/Heading";
import Container from "@/components/Container";
import Text from "@/components/Text";
import ApplicationProposalForm from "@/components/Creator/ApplicationProposalForm";
import ProfileIcon from "@/components/ProfileIcon";

export async function generateStaticParams() {
  // Prevent build failing during workflows build test
  if (process.env.APP_ENV === "development") {
    return [];
  }

  const { data } = await API.get("/opportunities?limit=0");

  return data.message.opportunities.map(({ opportunity_id }) => ({
    id: opportunity_id,
  }));
}

export const dynamicParams = false;

export default async function Opportunity({ params: { id: opportunity_id } }) {
  const {
    data: { title, description, company, type, compensation, user_id },
  } = await API(`/opportunities/opportunityid/${opportunity_id}`);

  return (
    <div className="bg-white bg-lilac-dots bg-repeat-x bg-[center_bottom_-2.5rem]">
      <Container size="2xl">
        <div className="pt-20 pb-64 space-y-8">
          <div>
            <Link
              href="/opportunities"
              className="text-sm inline-flex items-center gap-1.5 mb-8"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="h-2.5 w-2.5" />{" "}
              Back to Dashboard
            </Link>{" "}
            <ProfileIcon className="h-12 w-12" />
            <Heading size="3xl" className="mt-6 mb-1">
              {title}
            </Heading>
            <Text size="sm" className="capitalize">
              {company} &bull; {type} &bull; {compensation}
            </Text>
          </div>

          <div className="space-y-5 min-h-24">{description}</div>

          <ApplicationProposalForm
            opportunityId={opportunity_id}
            brandId={user_id}
          />
        </div>
      </Container>
    </div>
  );
}
