import { notFound } from "next/navigation";

import API from "@/api/api";

import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import Container from "@/components/Container";
import BrandApplications from "@/components/Brand/BrandApplications";
import Subheading from "@/components/Subheading";
import Heading from "@/components/Heading";

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
    <Container size="2xl" className="py-20 space-y-12">
      <div className="text-center space-y-1">
        <Heading size="3xl">{opportunity.title}</Heading>
        <Subheading>Applications</Subheading>
      </div>
      <BrandApplications applications={applications} {...opportunity} />
    </Container>
  );
}
