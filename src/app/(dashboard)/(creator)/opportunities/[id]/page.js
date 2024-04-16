import API from "@/api/api";

import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import Heading from "@/components/Heading";
import Container from "@/components/Container";
import Text from "@/components/Text";
import ProposalForm from "@/components/Creator/ProposalForm";

export async function generateStaticParams() {
  // Prevent build failing during workflows build test
  if (process.env.APP_ENV === "development") {
    return [];
  }

  const res = await API.get(`/opportunities`);

  const {
    data: { message },
  } = res;

  return message.map(({ opportunity_id }) => ({ id: opportunity_id }));
}

export const dynamicParams = false;

async function getOpportunitiesById(id) {
  try {
    const res = await API.get(`/opportunities/opportunityid/${id}`);
    return res.data;
  } catch (error) {
    throw new Error("Something went wrong when getting the opportunity");
  }
}

export default async function Opportunity({ params: { id } }) {
  const { title, description, company, type, compensation } =
    await getOpportunitiesById(id);

  return (
    <div className="bg-purple-dots bg-repeat-x bg-[center_bottom]">
      <Container size="2xl">
        <div className="mt-20 pb-60 space-y-8">
          <div>
            <Link
              href="/opportunities"
              className="text-sm inline-flex items-center gap-1.5 mb-7"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="h-2.5 w-2.5" />{" "}
              <span>Back to Dashboard</span>
            </Link>{" "}
            <img
              src="/images/guardian.png"
              alt="The Guardian"
              height={54}
              width={54}
            />
            <Heading size="3xl" className="mt-4 mb-1">
              {title}
            </Heading>
            <Text size="sm" className="capitalize">
              {company} &bull; {type} &bull; {compensation}
            </Text>
          </div>

          <div className="space-y-5">{description}</div>

          <ProposalForm opportunityId={id} />
        </div>
      </Container>
    </div>
  );
}
