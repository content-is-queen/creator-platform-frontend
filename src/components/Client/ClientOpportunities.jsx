"use client";

import { useState, useRef, useEffect, Suspense, useMemo } from "react";

import { register } from "swiper/element/bundle";

import Tabs from "@/components/Tabs";
import Empty from "@/components/Empty";
import CreateOpportunityModal from "@/components/Client/CreateOpportunityModal";
import ClientOpportunityCard from "@/components/Client/ClientOpportunityCard";

import { getOpportunitiesByUserId } from "@/utils";
import { useUser } from "@/context/UserContext";

register();

const ClientOpportunities = () => {
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

  const [opportunities, setOpportunities] = useState([]);
  const { user } = useUser();

  const [active, setActive] = useState(OPTIONS[0]);

  const swiperElRef = useRef(null);

  const filterOpportunities = (opportunities) => {
    active.id === "all"
      ? opportunities
      : opportunities.filter((i) => i.status === active.id);
  };

  useEffect(() => {
    (async () => {
      setOpportunities(await getOpportunitiesByUserId(user.uid));
    })();
  }, []);

  // TODO: on change update swiper to start at the index of the first slide

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
                  <ClientOpportunityCard {...opportunity} />
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

export default ClientOpportunities;
