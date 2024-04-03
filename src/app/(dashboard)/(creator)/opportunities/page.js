import API from "@/api/api";

import Heading from "@/components/Heading";
import Container from "@/components/Container";
import Search from "@/components/Search";

const TAGS = ["pitch", "broadcasting", "business", "publishing"];

// async function getData() {
//   const res = await API.get("/opportunities");

//   if (!res.status === 200) {
//     throw new Error("Failed to fetch data");
//   }

//   return res.data.message;
// }

const Opportunities = async () => {
  // const data = await getData();

  return (
    <Container size="2xl">
      <div className="text-center mt-20 mb-16">
        <Heading>Opportunities</Heading>
      </div>
      <Search tags={TAGS} />
    </Container>
  );
};

export default Opportunities;
