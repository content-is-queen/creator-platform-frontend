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
        "With Creator+ Membership, you gain unlimited access to curated industry opportunities and a powerful network of creators and brands. Whether you're aiming to grow your audience, secure sponsorships, or collaborate with respected industry voices, Creator+ provides the tools and support to help you succeed.",
      benefits: [
        {
          lead: "Unlimited Opportunities",
          copy: "Apply to as many projects and brand partnerships as you like. Increase your chances of securing paid collaborations and meaningful creative work.",
        },
        {
          lead: "Exclusive Community Access (Now on Google Groups)",
          copy: "Join our members-only Google Group and virtual co-working sessions. Collaborate and connect with podcasters, producers, and sound creatives worldwide. Access real-time peer support and feedback in a focused, creator-driven environment.",
        },
        {
          lead: "Monthly Group Office Hours",
          copy: "Learn from experienced industry professionals in live, interactive sessions. Get practical advice on audience growth, sponsorships, production, and more. Previous experts have worked with BBC, Acast, Audible, and other leading platforms.",
        },
        {
          lead: "Event Discounts",
          copy: "Receive discounted access to our in-person events. Enjoy free entry to virtual events, including expert panels and networking sessions. Stay connected to key players and future collaborators in the audio space.",
        },
        {
          lead: "Member Newsletter",
          copy: "Stay informed with insights tailored to emerging audio talent. Be the first to hear about new opportunities, platform updates, and industry trends. Get practical advice on format development, monetisation, and growing your brand.",
        },
      ],
      cta: {
        lead: "Upgrade now for just £100 per year",
        copy: "Join a forward-thinking community committed to amplifying diverse voices and building sustainable audio careers. Upgrade to Creator+ and access the support and opportunities you need to grow.",
      },
    },
    brand: {
      title: "Amplify Your Reach with Direct Access to Top-Tier Creators",
      lead: "Unlimited postings, exclusive insights, and a direct connection to top-tier creators",
      intro:
        "The Brand+ Membership gives you unlimited access to a curated network of talented audio creators. Whether you're launching a branded podcast, seeking creative partnerships, or looking to expand your brand’s presence through audio, Brand+ gives you the tools and connections to make it happen.",
      benefits: [
        {
          lead: "Unlimited Postings",
          copy: "Post as many opportunities as you need without limits. Connect with creators who align with your brand’s values and target audience. Streamline the process of finding, vetting, and securing creative partners.",
        },
        {
          lead: "Global Network",
          copy: "Access a diverse pool of creators from around the world. Discover fresh voices and unique perspectives that resonate with your audience. Build long-term relationships with high-quality creators.",
        },
        {
          lead: "Insightful Analytics (Coming soon!)",
          copy: "Access performance data and engagement insights from creator campaigns. Measure the impact of your partnerships with real-time reporting. Use actionable insights to optimise your future campaigns and partnerships.",
        },
        {
          lead: "Exclusive Event Invitations",
          copy: "Gain access to exclusive industry events and networking sessions.Connect with leading brands, agencies, and creators in the audio industry. Get insider insights on emerging trends and best practices.",
        },
        {
          lead: "Member-Only Newsletter",
          copy: "Stay updated with exclusive industry news and insights tailored for brands. Get early access to new creator collaborations and platform updates. Receive expert analysis on the evolving audio and podcasting landscape.",
        },
      ],
      cta: {
        lead: "Upgrade now for just £499 per year",
        copy: "Unlock unlimited opportunities, direct creator connections, and valuable industry insights. Drive brand growth through authentic, innovative audio storytelling.",
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
            Why join {user?.role}+?
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
