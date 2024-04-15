import API from "@/api/api";

import OpportunitiesList from "@/components/Creator/OpportunitiesList";
import Heading from "@/components/Heading";
import Container from "@/components/Container";

async function getData() {
  // Prevent build failing during workflows build test
  if (process.env.APP_ENV === "development") {
    return [];
  }

  // const res = await API.get("/opportunities");

  // if (!res.status === 200) {
  //   throw new Error("Failed to fetch data");
  // }

  // return res.data.message;
}

const Opportunities = async () => {
  const data = await getData();

  return (
    <Container size="2xl">
      <div className="text-center mt-20 mb-16">
        <Heading>Opportunities</Heading>
      </div>

      <OpportunitiesList opportunities={data} />
    </Container>
  );
};

export default Opportunities;
