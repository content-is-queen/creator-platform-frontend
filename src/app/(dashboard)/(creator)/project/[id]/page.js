import { notFound } from "next/navigation";

import API from "@/api/api";

import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import Container from "@/components/Container";
import BrandApplications from "@/components/Brand/BrandApplications";
import Subheading from "@/components/Subheading";

const getApplicationsById = async (id) => {
  try {
    const { data } = await API.get(`/applications/opportunity/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getOpportunityById = async (id) => {
  try {
    const { data } = await API.get(`/opportunities/opportunityid/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default async function Project({ params: { id: opportunityId } }) {
  const applications = await getApplicationsById(opportunityId);
  const opportunity = await getOpportunityById(opportunityId);

  if (!opportunity) {
    return notFound();
  }

  return (
    <div
      className="bg-queen-yellow bg-blue-dots bg-repeat-x bg-[center_bottom_-2.5rem]"
      style={{
        height: "calc(100vh - var(--nav-height))",
        maxHeight: "calc(100vh - var(--nav-height))",
      }}
    >
      <Container size="2xl" className="py-20 space-y-6">
        <Subheading>{opportunity.title} applications</Subheading>
        <BrandApplications applications={applications} {...opportunity} />
      </Container>
    </div>
  );
}
