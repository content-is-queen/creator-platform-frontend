"use client";

import { notFound } from "next/navigation";

import { useUser } from "@/context/UserContext";

import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import Text from "@/components/Text";
import CheckoutForm from "@/components/CheckoutForm";
import Block from "@/components/Block";
import DecorativeText from "@/components/DecorativeText";
import Heading from "@/components/Heading";
import Subheading from "@/components/Subheading";

const Plus = () => {
  const { user } = useUser();

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
      cta: {
        lead: "Upgrade now for just £100 per year",
        copy: "Unlock the full potential of your creative journey. Join a community that celebrates and amplifies diverse voices in the audio industry.",
      },
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
      cta: {
        lead: "Upgrade now for just £499 per year",
        copy: "Take your brand’s presence to the next level. Join a platform committed to fostering diversity and driving innovation in audio content.",
      },
    },
  };

  if ((user && user?.role === "admin") || user?.role === "super_admin") {
    return notFound();
  }

  return (
    <>
      <Block className="bg-queen-blue -mt-12">
        <div className="text-center space-y-6">
          <DecorativeText className="relative top-2 text-queen-orange text-5xl">
            Upgrade
          </DecorativeText>
          <Heading color="white" size="6xl">
            {user ? COPY[user.role].title : <LoadingPlaceholder.Bar />}
          </Heading>
          <Text className="text-queen-white" size="xl">
            {user ? COPY[user.role].lead : <LoadingPlaceholder.Bar />}
          </Text>
          <Text className="text-queen-white max-w-md mx-auto">
            {user ? COPY[user.role].intro : <LoadingPlaceholder.Bar />}
          </Text>
          <CheckoutForm variant="yellow" />
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
          <div className="space-y-4">
            <Subheading size="xl">
              {user ? COPY[user.role].cta.lead : <LoadingPlaceholder.Bar />}
            </Subheading>
            <Text className="max-w-md">
              {user ? COPY[user.role].cta.copy : <LoadingPlaceholder.Bar />}
            </Text>
          </div>
          <CheckoutForm variant="yellow" />
        </div>
      </Block>
    </>
  );
};

export default Plus;
