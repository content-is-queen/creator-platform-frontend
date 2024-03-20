"use client";

import { useState, useRef, useEffect } from "react";

import { register } from "swiper/element/bundle";

import Tabs from "@/components/Tabs";
import ClientOpportunityCard from "./ClientOpportunityCard";

register();

const ProjectsTabs = ({ opportunities }) => {
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

  const [active, setActive] = useState(OPTIONS[0]);

  const swiperElRef = useRef(null);

  useEffect(() => {
    // listen for Swiper events using addEventListener
    swiperElRef.current.addEventListener("swiperprogress", (e) => {
      const [swiper, progress] = e.detail;
      console.log(progress);
    });

    swiperElRef.current.addEventListener("swiperslidechange", (e) => {
      console.log("slide changed");
    });
  }, []);

  const filteredOpportunities =
    active.id === "all"
      ? opportunities
      : opportunities.filter((i) => i.status === active.id);

  useEffect(() => {}, [active]);

  return (
    <section>
      <Tabs options={OPTIONS} active={active} setActive={setActive} />
      <swiper-container
        className="gap-12"
        ref={swiperElRef}
        slides-per-view="3"
        navigation="true"
      >
        {filteredOpportunities?.map((opportunity, index) => (
          <swiper-slide key={index}>
            <ClientOpportunityCard {...opportunity} />
          </swiper-slide>
        ))}
      </swiper-container>
    </section>
  );
};

export default ProjectsTabs;
