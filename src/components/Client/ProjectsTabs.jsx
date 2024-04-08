"use client";

import { useState, useRef, useEffect, Suspense, useMemo } from "react";

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
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);

  const swiperElRef = useRef(null);

  // TODO: on change update swiper to start at the index of the first slide
  useMemo(() => {
    // const filterOpportunities = (opportunities) => {
    //   active.id === "all"
    //     ? opportunities
    //     : opportunities.filter((i) => i.status === active.id);
    // };

    if (opportunities) setFilteredOpportunities(opportunities);
  }, [opportunities]);

  useEffect(() => {}, [active]);

  return (
    <section>
      <Suspense>
        <Tabs options={OPTIONS} active={active} setActive={setActive} />
        <swiper-container
          ref={swiperElRef}
          space-between="25"
          slides-per-view="3"
          navigation="true"
          class="my-6"
        >
          {filteredOpportunities.length > 0 &&
            filteredOpportunities.map((opportunity, index) => (
              <swiper-slide key={index} class="m-1">
                <ClientOpportunityCard {...opportunity} />
              </swiper-slide>
            ))}
        </swiper-container>
      </Suspense>
    </section>
  );
};

export default ProjectsTabs;
