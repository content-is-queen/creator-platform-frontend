import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import Heading from "@/components/Heading";
import MainNav from "@/components/MainNav";
import Container from "@/components/Container";
import Button from "@/components/Button";
import Form from "@/components/Form";

import opportunities from "@/data/opportunities.json";

export async function generateStaticParams() {
  const types = Object.keys(opportunities).map((opp) => {
    return { slug: opp };
  });

  return types;
}

export const dynamicParams = false;

const Page = async ({ params }) => {
  const { slug } = params;

  return (
    <div className="bg-purple-dots bg-repeat-x bg-[center_bottom]">
      <MainNav />
      <Container size="2xl">
        <div className="mt-20 pb-96 space-y-8">
          <div>
            <Link
              href="/"
              className="text-sm inline-flex items-center gap-1.5 mb-4"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="h-2.5 w-2.5" />{" "}
              <span>Go back</span>
            </Link>
            <Heading size="3xl" className="mb-1">
              Create a new {slug}
            </Heading>
          </div>

          <Form fields={opportunities[slug].fields} />

          <Button as="button" type="button">
            Submit
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Page;
