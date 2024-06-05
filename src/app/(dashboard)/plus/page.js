"use client";

import Heading from "@/components/Heading";
import Container from "@/components/Container";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import Text from "@/components/Text";
import CheckoutForm from "@/components/CheckoutForm";
import Block from "@/components/Block";

import { useUser } from "@/context/UserContext";

const Plus = () => {
  const { user } = useUser();

  const COPY = {
    creator: { heading: "Apply for unlimited opportunities" },
    brand: { heading: "Post unlimited projects" },
  };

  return (
    <>
      <Container size="3xl" className="mb-32">
        <div className="text-center pt-36 pb-32 space-y-6">
          <div className="space-y-6">
            <Heading size="4xl">
              {!user ? <LoadingPlaceholder /> : COPY[user.role].heading}
            </Heading>
            <Text size="xl">Become a plus member for just £5.99 a month</Text>
          </div>

          <CheckoutForm />
        </div>
      </Container>
      <Block></Block>
    </>
  );
};

export default Plus;
