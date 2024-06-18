import { notFound } from "next/navigation";

import API from "@/api/api";

import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import Heading from "@/components/Heading";
import Container from "@/components/Container";
import Text from "@/components/Text";
import ApplicationProposalForm from "@/components/Creator/ApplicationProposalForm";
import ProfileIcon from "@/components/ProfileIcon";

export default async function Opportunity({ params: { id: opportunityId } }) {
  const { data } = await API(`/opportunities/opportunityid/${opportunityId}`);

  const {
    title,
    description,
    company,
    type,
    organizationName,
    compensation,
    applicationInstructions,
    salary,
    userId,
    profilePhoto,
  } = data;

  if (!data) {
    return notFound();
  }

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
            <ProfileIcon className="h-12 w-12" profilePhoto={profilePhoto} />
            <Heading size="3xl" className="mt-6 mb-1">
              {title}
            </Heading>
            <Text size="sm" className="capitalize">
              {organizationName || company} &bull; {type} &bull;{" "}
              {compensation || salary}
            </Text>
          </div>

          <div className="space-y-5 min-h-24 max-w-lg">{description}</div>

          <ApplicationProposalForm
            opportunityId={opportunityId}
            applicationInstructions={applicationInstructions}
            brandId={userId}
          />
        </div>
      </Container>
    </div>
  );
}
