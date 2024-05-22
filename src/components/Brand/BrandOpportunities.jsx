"use client";

import { useState, useRef } from "react";

import { register } from "swiper/element/bundle";

import Tabs from "@/components/Tabs";
import Empty from "@/components/Empty";
import CreateOpportunityModal from "@/components/Brand/CreateOpportunityModal";
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

  const [opportunities, setOpportunities, loading] = useOpportunities(
    { user_id: user.uid },
    (data) => {
      setOpportunities(data.filter((i) => i.status !== "archived"));
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

  return (
    <>
      {opportunities.length > 0 ? (
        <section>
          <Tabs options={OPTIONS} active={active} setActive={setActive} />
          <swiper-container
            ref={swiperElRef}
            space-between="25"
            slides-per-view="3"
            navigation="true"
            class="my-6"
          >
            {opportunities.length > 0 &&
              opportunities.map((opportunity, index) => (
                <swiper-slide key={index} class="m-1">
                  <BrandOpportunityCard {...opportunity} />
                </swiper-slide>
              ))}
          </swiper-container>
        </section>
      ) : (
        <Empty href="/opportunities" button={<CreateOpportunityModal />}>
          Looks like you haven't listed any opportunities yet.
        </Empty>
      )}
    </>
  );
};

export default BrandOpportunities;
