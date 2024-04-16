import API from "@/api/api";

import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import Heading from "@/components/Heading";
import Container from "@/components/Container";
import ApplicationCard from "@/components/Client/ApplicationCard";

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

async function getApplicationsById(id) {
  try {
    const res = await API.get(`/applications/${id}`);
    return res.data;
  } catch (error) {
    throw new Error("Something went wrong when trying to get the applications");
  }
}

async function getOpportunity(id) {
  try {
    const res = await API.get(`/opportunities/opportunityid/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(
      "Something went wrong when trying to get the opportunity data"
    );
  }
}

export default async function Applications({ params: { id } }) {
  const applications = await getApplicationsById(id);
  const { title } = await getOpportunity(id);

  return (
    <div className="bg-purple-dots bg-repeat-x bg-[center_bottom]">
      <Container size="2xl">
        <div className="mt-20 pb-60 space-y-8">
          <div>
            <Link
              href="/"
              className="text-sm inline-flex items-center gap-1.5 mb-7"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="h-2.5 w-2.5" />{" "}
              <span>Back to Dashboard</span>
            </Link>
            <Heading size="2xl" className="mt-4 mb-1">
              {title} Applications
            </Heading>
          </div>

          {applications.length > 0 ? (
            applications.map((application, index) => (
              <ApplicationCard key={`application-${index}`} {...application} />
            ))
          ) : (
            <>There are currently no applications for this opportunity</>
          )}
        </div>
      </Container>
    </div>
  );
}
