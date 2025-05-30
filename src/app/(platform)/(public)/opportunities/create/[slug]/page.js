import Heading from "@/components/Heading";
import Container from "@/components/Container";
import CreateOpportunityForm from "@/components/Brand/CreateOpportunityForm";

import formData from "@/data/opportunity_form_data.json";
import BackButton from "@/components/BackButton";
import AuthGuard from "@/components/AuthGuard";

export async function generateStaticParams() {
  return Object.keys(formData).map((opp) => {
    return { slug: opp };
  });
}

export const dynamicParams = false;

const Page = async ({ params }) => {
  const { slug } = params;

  return (
    <AuthGuard>
      <div className="bg-queen-white bg-lilac-dots bg-repeat-x bg-[center_bottom_-2.5rem]">
        <Container size="2xl">
          <div className="pt-20 pb-72 space-y-8">
            <div>
              <BackButton />
              <Heading size="3xl" className="pt-4 pb-12">
                Create a new {slug}
              </Heading>
            </div>

            <CreateOpportunityForm type={slug} />
          </div>
        </Container>
      </div>
    </AuthGuard>
  );
};

export default Page;

export async function generateMetadata({ params }) {
  const { slug } = params;

  return {
    title: `Create a ${slug}`,
  };
}
