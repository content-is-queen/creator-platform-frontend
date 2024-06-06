"use client";

import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import Text from "@/components/Text";
import CheckoutForm from "@/components/CheckoutForm";
import Block from "@/components/Block";
import Card from "@/components/Card";
import DecorativeText from "@/components/DecorativeText";
import Heading from "@/components/Heading";

import { useUser } from "@/context/UserContext";
import Button from "@/components/Button";

const Plus = () => {
  const { user } = useUser();

  const COPY = {
    creator: {
      lead: "Apply for unlimited opportunities",
      included: [
        {
          lead: "Unlimited opportunities",
          copy: "Increase your chance of getting hired, with the freedom to apply for as many opportunities as you want.",
        },
      ],
    },
    brand: {
      lead: "Post unlimited projects",
      included: [
        {
          lead: "Find talent",
          copy: "Access a wide range of creators whose content resonates with diverse audience groups.",
        },
      ],
    },
  };

  return (
    <>
      <Block className="bg-queen-blue">
        <div className="text-center space-y-4">
          <DecorativeText className="relative top-2 text-queen-orange text-5xl">
            Sign up
          </DecorativeText>
          <Heading color="white" size="5xl">
            Unlock the full experience
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
        className="relative bg-right bg-contain"
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
