import { notFound } from "next/navigation";
import API from "@/api/api";
import Applications from "@/components/Brand/Applications";

export default async function Opportunity({ params: { id: opportunityId } }) {
  const { data } = await API(`/opportunities/opportunityid/${opportunityId}`);

  if (!data) {
    return notFound();
  }

  return <Applications id={opportunityId} />;
}

export async function generateMetadata({ params }) {
  const {
    data: { title },
  } = await API(`/opportunities/opportunityid/${params.id}`);

  return {
    title: `${title} | Opportunity`,
  };
}
