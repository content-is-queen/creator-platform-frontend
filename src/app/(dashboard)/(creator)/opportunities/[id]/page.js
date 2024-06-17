import { notFound } from "next/navigation";

import API from "@/api/api";

import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import Container from "@/components/Container";
import ApplicationProposalForm from "@/components/Creator/ApplicationProposalForm";
import Job from "@/components/Opportunities/Job";
import Campaign from "@/components/Opportunities/Campaign";
import Pitch from "@/components/Opportunities/Pitch";

export default async function Opportunity({ params: { id: opportunityId } }) {
  const { data } = await API(`/opportunities/opportunityid/${opportunityId}`);

  const { type, applicationInstructions, userId } = data;

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
        <div className="pt-20 pb-64 space-y-12">
          <div>
            <Link
              href="/opportunities"
              className="text-sm inline-flex items-center gap-1.5"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="h-2.5 w-2.5" />{" "}
              Back to Dashboard
            </Link>
          </div>

          <Component {...data} />

          <ApplicationProposalForm
            opportunityId={opportunityId}
            applicationInstructions={applicationInstructions}
            authorId={userId}
          />
        </div>
      </Container>
    </div>
  );
}
