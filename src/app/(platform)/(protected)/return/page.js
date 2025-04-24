"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { useUser } from "@/context/UserContext";
import API from "@/api/api";

import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import Text from "@/components/Text";
import Block from "@/components/Block";
import DecorativeText from "@/components/DecorativeText";
import Heading from "@/components/Heading";
import Subheading from "@/components/Subheading";
import Button from "@/components/Button";
import CreateOpportunityModal from "@/components/Brand/CreateOpportunityModal";
import SpinnerScreen from "@/components/SpinnerScreen";
import { auth } from "@/firebase.config";

const COPY = {
  creator: {
    title: "Elevate Your Audio Journey",
    lead: "Unlock unlimited opportunities, exclusive resources, and a global network",

    intro:
      "Ready to take your audio content to the next level? With the Creator+ Membership, you gain unlimited access to opportunities and an array of resources designed to support and amplify your creative journey.",
    benefits: [
      {
        lead: "Unlimited Opportunities",
        copy: " Apply to as many opportunities as you like, without any limits. Maximise your chances of finding the perfect projects and collaborations.",
      },
      {
        lead: "Exclusive Community Access",
        copy: "Join our members-only Slack channel and virtual co-working space. Connect, share, and collaborate with fellow creators from around the world.",
      },
      {
        lead: "Monthly Group Office Hours",
        copy: " Gain insights and guidance from industry experts during our monthly group office hours, designed to help you navigate the audio content landscape.",
      },
      {
        lead: "Event Discounts",
        copy: "Receive discounts on in-person events and enjoy free access to virtual events, giving you the chance to network and learn from the best.",
      },
      {
        lead: "Member Newsletter",
        copy: " Stay informed with our exclusive newsletter, packed with industry news, trends, and tips to keep you ahead of the curve.",
      },
    ],
    cta: (
      <Button href="/opportunities" size="lg" variant="yellow">
        View opportunities
      </Button>
    ),
  },
  brand: {
    title: "Amplify Your Reach  ",
    lead: "Unlimited postings, exclusive insights, and a direct connection to top-tier creators",
    intro:
      "Ready to discover fresh voices and innovative content? The Brand+ Membership offers unlimited access to a diverse pool of talented audio creators, tailored to meet your brand's unique needs.",
    benefits: [
      {
        lead: "Unlimited Postings",
        copy: "Post as many opportunities as you need. Connect with talented creators who can bring your projects to life without any limits.",
      },
      {
        lead: "Global Network",
        copy: "Engage with a diverse network of creators, expanding your reach and discovering new talent from around the world.",
      },
      {
        lead: "Exclusive Event Invitations",
        copy: "Get invited to exclusive industry events, providing you with the perfect platform to network, stay ahead of trends, and build valuable connections.",
      },
      {
        lead: "Insightful Analytics",
        copy: "Access advanced analytics and insights to measure the impact of your collaborations and refine your strategies.",
      },
      {
        lead: "Member Newsletter",
        copy: "Stay updated with our exclusive newsletter, featuring the latest industry news, trends, and insights tailored for brands.",
      },
    ],
    cta: <CreateOpportunityModal />,
  },
};

const Return = () => {
  const { loading, user } = useUser();

  const authUser = auth?.currentUser;

  const [status, setStatus] = useState(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const checkSession = useCallback(
    async (sessionId) => {
      try {
        const {
          data: { status },
        } = await API.post("/payments/subscribe", {
          sessionId,
          userId: user.uid,
        });

        if (status === "complete") {
          const newToken = await authUser.getIdToken(true);
          localStorage.setItem("token", JSON.stringify(newToken));
        }

        setStatus(status);
      } catch (error) {
        console.error(error);
      }
    },
    [searchParams]
  );

  useEffect(() => {
    const sessionId = searchParams.get("sessionId");
    if (sessionId && user && !loading) {
      void checkSession(sessionId);
    }
  }, [user, loading, checkSession]);

  if (loading) return <SpinnerScreen />;

  if (status === "open") {
    router.replace("/checkout");
  }

  if (status === "complete") {
    return (
      <Suspense>
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
        <Block className="relative bg-right bg-queen-yellow" small>
          <div>
            <DecorativeText className="text-5xl mb-8 md:mb-16">
              Benefits:
            </DecorativeText>

            <div className="grid md:grid-cols-3 gap-10">
              {user
                ? COPY[user.role].benefits.map(({ lead, copy }, index) => (
                    <div key={index} className="space-y-2">
                      <Subheading size="lg">{lead}</Subheading>
                      <Text>{copy}</Text>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </Block>
        <Block
          className="relative bg-right bg-queen-white"
          style={{
            backgroundImage: "url('/images/CiQ-39.svg')",
            backgroundRepeat: "repeat-y",
            backgroundSize: "auto",
          }}
        >
          <div className="space-y-8">
            <div className="space-y-2">
              <Subheading size="xl">
                {user ? COPY[user.role].title : <LoadingPlaceholder.Bar />}
              </Subheading>
              <Text className="max-w-md">
                {user ? COPY[user.role].lead : <LoadingPlaceholder.Bar />}
              </Text>
            </div>
            <div className="!mt-8">
              {user ? COPY[user.role].cta : <LoadingPlaceholder dark />}
            </div>
          </div>
        </Block>
      </Suspense>
    );
  }

  return null;
};

export default Return;
