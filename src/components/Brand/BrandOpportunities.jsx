"use client";

import { useState, useRef } from "react";

import { register } from "swiper/element/bundle";

import Tabs from "@/components/Tabs";
import Container from "../Container";
import Heading from "../Heading";
import BrandOpportunityCard from "@/components/Brand/BrandOpportunityCard";
import SpinnerScreen from "@/components/SpinnerScreen";

import { useUser } from "@/context/UserContext";
import useOpportunities from "@/hooks/useOpportunities";

register();

const BrandOpportunities = () => {
  const OPTIONS = [
    {
      label: "All",
      id: "all",
    },
    {
      label: "Live",
      id: "live",
    },
    {
      label: "In Progress",
      id: "in_progress",
    },
    {
      label: "Completed",
      id: "completed",
    },
  ];

  const { user } = useUser();

  const [active, setActive] = useState(OPTIONS[0]);

  const { opportunities, setOpportunities, loading } = useOpportunities(
    { user_id: user.uid },
    (data) => {
      setOpportunities(data?.filter((i) => i.status !== "archived"));
    }
  );

  const swiperElRef = useRef(null);

  const filterOpportunities = (opportunities) => {
    active.id === "all"
      ? opportunities
      : opportunities.filter((i) => i.status === active.id);
  };

  // TODO: on change update swiper to start at the index of the first slide
  if (loading) return <SpinnerScreen />;

  if (opportunities?.length > 0) {
    return (
      <section>
        <Tabs options={OPTIONS} active={active} setActive={setActive} />
        <swiper-container
          ref={swiperElRef}
          space-between="25"
          slides-per-view="3"
          navigation="true"
          class="my-6"
        >
          {opportunities?.length > 0 &&
            opportunities.map((opportunity, index) => (
              <swiper-slide key={index} class="m-1">
                <BrandOpportunityCard {...opportunity} />
              </swiper-slide>
            ))}
        </swiper-container>
      </section>
    );
  }

  return (
    <div className="text-center pt-28 pb-20">
      <Container className="space-y-2">
        <p className="font-subheading font-bold text-xl text-queen-black">
          Find new talent
        </p>
        <div className="space-y-6 max-w-lg mx-auto">
          <p>Select "Create opportunity" to get started</p>
        </div>
      </Container>
    </div>
  );
};

export default BrandOpportunities;
