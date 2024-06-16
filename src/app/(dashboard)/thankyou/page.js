"use client";

import { Suspense } from "react";

import { useUser } from "@/context/UserContext";

import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import Text from "@/components/Text";
import Block from "@/components/Block";
import DecorativeText from "@/components/DecorativeText";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import CreateOpportunityModal from "@/components/Brand/CreateOpportunityModal";
import Subscribe from "@/components/Subscribe";
import { notFound } from "next/navigation";

const Thankyou = () => {
  const { user } = useUser();

  const COPY = {
    creator: {
      cta: (
        <Button href="/opportunities" size="lg" variant="yellow">
          View opportunities
        </Button>
      ),
      included: {
        lead: "Unlimited opportunities",
        copy: "Increase your chance of getting hired, with the freedom to apply for as many opportunities as you want.",
      },
    },
    brand: {
      cta: <CreateOpportunityModal />,
      included: {
        lead: "Find talent",
        copy: "Access a wide range of creators whose content resonates with diverse audience groups.",
      },
    },
  };

  if (user.role === "admin" || user.role === "super_admin") {
    return notFound();
  }

  return (
    <>
      <Block className="bg-queen-orange">
        <div className="text-center space-y-4">
          <DecorativeText className="relative top-1 text-queen-white text-5xl">
            Thank you
          </DecorativeText>
          <Heading size="5xl">Continue your search</Heading>
          <div className="!mt-8">
            {user ? COPY[user.role].cta : <LoadingPlaceholder dark />}
          </div>
        </div>
      </Block>
      <Block
        className="relative bg-right bg-contain bg-queen-blue text-queen-white"
        style={{
          backgroundImage: "url('/images/CiQ-39.svg')",
          backgroundRepeat: "no-repeat",
        }}
        small
      >
        <div className="space-y-3 max-w-md">
          <DecorativeText className="text-5xl">Why plus:</DecorativeText>
          <Text size="xl">
            {user ? (
              COPY[user.role].included.lead
            ) : (
              <LoadingPlaceholder.Bar dark />
            )}
          </Text>
          <Text size="lg">
            {user ? COPY[user.role].included.copy : <LoadingPlaceholder dark />}
          </Text>
        </div>
        <div className="mt-8">
          {user ? COPY[user.role].cta : <LoadingPlaceholder dark />}
        </div>
      </Block>
      <Suspense>
        <Subscribe />
      </Suspense>
    </>
  );
};

export default Thankyou;
