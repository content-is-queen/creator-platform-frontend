import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import Heading from "@/components/Heading";
import Container from "@/components/Container";
import CreateOpportunityForm from "@/components/Brand/CreateOpportunityForm";

import formData from "@/data/opportunity_form_data.json";

export async function generateStaticParams() {
  const types = Object.keys(formData).map((opp) => {
    return { slug: opp };
  });

  return types;
}

export const dynamicParams = false;

const Page = async ({ params }) => {
  const { slug } = params;

  return (
    <div className="bg-queen-white bg-lilac-dots bg-repeat-x bg-[center_bottom_-2.5rem]">
      <Container size="2xl">
        <div className="pt-20 pb-72 space-y-8">
          <div>
            <Link
              href="/"
              className="text-sm inline-flex items-center gap-1.5 mb-4"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="h-2.5 w-2.5" />{" "}
              <span>Go back</span>
            </Link>
            <Heading size="3xl" className="mb-12">
              Create a new {slug}
            </Heading>
          </div>

          <CreateOpportunityForm type={slug} />
        </div>
      </Container>
    </div>
  );
};

export default Page;
