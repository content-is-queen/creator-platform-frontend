"use client";

import "./Dashboard.css";

import MainNav from "@/components/MainNav";
import Heading from "@/components/Heading";
import Container from "@/components/Container";
import Text from "@/components/Text";
import OpportunityCard from "@/components/OpportunityCard";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import API from "@/api/api";

const OPPORTUNITIES = [
  {
    company: {
      name: "The Guardian",
      image: { src: "/images/guardian.png" },
      profileUrl: "/#",
    },
    title: "Marketing email",
    budget: "Under 1k",
    deadline: "2 Mar 2024",
    href: "/#",
    type: "Pitch",
    excerpt:
      "‘Think: Sustainability’ is a podcast about practical solutions for a bette.....",
  },
  {
    company: {
      name: "The Guardian",
      image: { src: "/images/guardian.png" },
      profileUrl: "/#",
    },
    title: "Marketing email",
    budget: "Under 1k",
    deadline: "2 Mar 2024",
    href: "/#",
    type: "Pitch",
    excerpt:
      "‘Think: Sustainability’ is a podcast about practical solutions for a bette.....",
  },
  {
    company: {
      name: "The Guardian",
      image: { src: "/images/guardian.png" },
      profileUrl: "/#",
    },
    title: "Marketing email",
    budget: "Under 1k",
    deadline: "2 Mar 2024",
    href: "/#",
    type: "Pitch",
    excerpt:
      "‘Think: Sustainability’ is a podcast about practical solutions for a bette.....",
  },
];

const Dashboard = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [opportunitiesList,setOpportunitiesList] =useState();
  const [isLoading, setIsloading] = useState(false);

  const fetchUserProfile = async () => {
    try {
      const response = await API.get('auth/profile');
      setUserProfile(response.data.message);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchOpportunitiesList = async () => {
    try {
      const opportunity = [];
      setIsloading(true);
      const response = await API.get('/opportunities');
      response.data.message?.map(item=>{
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
      })
      setOpportunitiesList(opportunity);
      setIsloading(false);

    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchOpportunitiesList();
  }, []);


  console.log(opportunitiesList);
return <main>
    <MainNav />
    <div className="bg-queen-white h-full py-12 md:py-20">
      <Container>
        <Heading>Welcome back,{isLoading? "Loading ..." : ''} {userProfile?.podcast_name}</Heading>
        <div className="dashboard_grid gap-8">
          <div className="pt-2 pl-0">
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
          <div className="right-opportunity">
            <div className="opp_top rounded-2xl"></div>
            <div className="opp_down rounded-2xl"></div>
          </div>
        </div>
      </Container>
    </div>
  </main>
    };

export default Dashboard;
