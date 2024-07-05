"use client";

import { notFound } from "next/navigation";

import { useUser } from "@/context/UserContext";

import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import Text from "@/components/Text";
import CheckoutForm from "@/components/CheckoutForm";
import Block from "@/components/Block";
import DecorativeText from "@/components/DecorativeText";
import Heading from "@/components/Heading";

const Plus = () => {
  const { user } = useUser();

  const COPY = {
    creator: {
      title: "Elevate Your Audio Journey",
      lead: "Unlock unlimited opportunities, exclusive resources, and a global network",
      included: [
        {
          lead: "Unlimited opportunities",
          copy: "Increase your chance of getting hired, with the freedom to apply for as many opportunities as you want.",
        },
      ],
    },
    brand: {
      title: "Amplify Your Reach  ",
      lead: "Unlimited postings, exclusive insights, and a direct connection to top-tier creators",
      included: [
        {
          lead: "Find talent",
          copy: "Access a wide range of creators whose content resonates with diverse audience groups.",
        },
      ],
    },
  };

  if ((user && user?.role === "admin") || user?.role === "super)admin") {
    return notFound();
  }

  return (
    <>
      <Block className="bg-queen-blue">
        <div className="text-center space-y-4">
          <DecorativeText className="relative top-2 text-queen-orange text-5xl">
            Upgrade
          </DecorativeText>
          <Heading color="white" size="5xl">
            {user ? COPY[user.role].title : <LoadingPlaceholder.Bar />}
          </Heading>
          <Text className="text-queen-white" size="xl">
            <span>
              {user ? COPY[user.role].lead : <LoadingPlaceholder.Bar />}
            </span>
          </Text>
          <CheckoutForm variant="yellow" />
        </div>
      </Block>
      <Block
        className="relative bg-right bg-contain bg-queen-white"
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
              COPY[user.role].included[0].lead
            ) : (
              <LoadingPlaceholder.Bar dark />
            )}
          </Text>
          <Text size="lg">
            {user ? (
              COPY[user.role].included[0].copy
            ) : (
              <LoadingPlaceholder dark />
            )}
          </Text>
        </div>
        <CheckoutForm variant="yellow" className="mt-8" />
      </Block>
    </>
  );
};

export default Plus;
