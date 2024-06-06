"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";

import API from "@/api/api";
import useToken from "@/hooks/useToken";
import { useUser } from "@/context/UserContext";

import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import Text from "@/components/Text";
import Block from "@/components/Block";
import DecorativeText from "@/components/DecorativeText";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import CreateOpportunityModal from "@/components/Brand/CreateOpportunityModal";

const Thankyou = () => {
  const { user, setUser } = useUser();
  const token = useToken();
  const searchParams = useSearchParams();

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

  const subscribe = async (session_id) => {
    try {
      const response = await API.post(
        "/payments/subscribe",
        { session_id, user_id: user.uid, email: user.email },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser({ ...user, subscribed: true });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (sessionId && user) {
      subscribe(sessionId);
    }
  }, [user]);

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
    </>
  );
};

export default Thankyou;
