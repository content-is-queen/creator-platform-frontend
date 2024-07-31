import { notFound } from "next/navigation";

import API from "@/api/api";

import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";

import Container from "@/components/Container";
import ApplicationProposalForm from "@/components/Creator/ApplicationProposalForm";
import Job from "@/components/Opportunities/Job";
import Campaign from "@/components/Opportunities/Campaign";
import Pitch from "@/components/Opportunities/Pitch";
import Button from "@/components/Button";
import BackButton from "@/components/BackButton";

export default async function Opportunity({ params: { id: opportunityId } }) {
  const { data } = await API(`/opportunities/opportunityid/${opportunityId}`);

  const { type, applicationInstructions, userId, link } = data;

  if (!data) {
    return notFound();
  }

  let Component;

  switch (type) {
    case "pitch":
      Component = Pitch;
      break;
    case "job":
      Component = Job;
      break;
    case "campaign":
      Component = Campaign;
      break;
  }

  return (
    <div className="bg-white bg-lilac-dots bg-repeat-x bg-[center_bottom_-2.5rem]">
      <Container size="2xl">
        <div className="pt-20 pb-72 space-y-12">
          <div className="space-y-8">
            <BackButton />

            <Component {...data} />
          </div>

          {link ? (
            <Button
              as="a"
              href={link}
              target="_blank"
              className="items-center inline-flex gap-1"
            >
              Apply
              <FontAwesomeIcon className="h-2.5" icon={faExternalLink} />
            </Button>
          ) : (
            <ApplicationProposalForm
              opportunityId={opportunityId}
              applicationInstructions={applicationInstructions}
              authorId={userId}
            />
          )}
        </div>
      </Container>
    </div>
  );
}
