"use client";

import { useEffect, useState } from "react";
import API from "@/api/api";

import MainNav from "@/components/MainNav";
import Heading from "@/components/Heading";
import Container from "@/components/Container";
import Text from "@/components/Text";
import OpportunityCard from "@/components/OpportunityCard";
import Button from "@/components/Button";
import Panel from "@/components/Panel";

const Dashboard = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [opportunitiesList, setOpportunitiesList] = useState();
  const [isLoading, setIsloading] = useState(false);

  const fetchUserProfile = async () => {
    try {
      const response = await API.get("auth/profile");
      setUserProfile(response.data.message);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const fetchOpportunitiesList = async () => {
    try {
      const opportunity = [];
      setIsloading(true);
      const response = await API.get("/opportunities");
      response.data.message?.map((item) => {
        opportunity.push({
          company: {
            name: "The Guardian",
            image: { src: "/images/guardian.png" },
            profileUrl: "/#",
          },
          title: item.title,
          budget: "Under 1k",
          deadline: "2 Mar 2024",
          href: "/#",
          type: "Pitch",
          excerpt:
            "‘Think: Sustainability’ is a podcast about practical solutions for a bette.....",
        });
      });
      setOpportunitiesList(opportunity);
      setIsloading(false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchOpportunitiesList();
  }, []);

  return (
    <main>
      <MainNav />
      <div className="bg-queen-white h-full py-12 md:py-20">
        <Container>
          <Heading>
            Welcome back,{isLoading ? "Loading ..." : ""}{" "}
            {userProfile?.podcast_name}
          </Heading>
          <div className="grid gap-8 md:grid-cols-6">
            <div className="pt-2 pl-0 md:col-span-4">
              <Text size="xl" className="mb-4">
                Recommended opportunities for you
              </Text>
              <ul className="grid gap-2">
                {opportunitiesList?.map((opportunity, index) => (
                  <li key={`${opportunity.title}-${index}`} className="pt-4">
                    <OpportunityCard {...opportunity} />
                  </li>
                ))}
              </ul>
              <Button href="/opportunities" className="mt-16">
                View all opportunities
              </Button>
            </div>
            <div className="grid gap-8 md:col-span-2">
              <Panel title="Overview"></Panel>
              <Panel title="Most Recent Chat"></Panel>
            </div>
          </div>
        </Container>
      </div>
    </main>
  );
};

export default Dashboard;