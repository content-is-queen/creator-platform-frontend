"use client";

import { use } from "react";
import { useState, useLayoutEffect } from "react";
import API from "@/api/api";

import MainNav from "@/components/MainNav";
import Heading from "@/components/Heading";
import Container from "@/components/Container";
import Text from "@/components/Text";
import OpportunityCard from "@/components/OpportunityCard";
import Button from "@/components/Button";
import Panel from "@/components/Panel";
import { useUserProfile } from "@/contexts/AuthContext/UserProfileContext";
import { redirect } from "next/navigation";

const Dashboard = () => {
  const { userProfile } = useUserProfile();

  const opportunities = [];

  useLayoutEffect(() => {
    if (!userProfile) {
      redirect("/login");
    }
  }, [userProfile]);

  return (
    <main>
      <MainNav />
      <div className="bg-queen-white h-full py-12 md:py-20">
        <Container>
          <Heading>Welcome back, {userProfile?.name}</Heading>
          <div className="grid gap-8 md:grid-cols-6">
            <div className="pt-2 pl-0 md:col-span-4">
              <Text size="xl" className="mb-4">
                Recommended opportunities for you
              </Text>
              <ul className="grid gap-2">
                {opportunities?.map((opportunity, index) => (
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
