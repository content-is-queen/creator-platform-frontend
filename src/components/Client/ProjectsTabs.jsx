"use client";

import { useState, useRef, useEffect } from "react";

import { register } from "swiper/element/bundle";

import Tabs from "@/components/Tabs";
import ClientOpportunityCard from "./ClientOpportunityCard";
import { set } from "react-hook-form";

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

    const filteredOpportunities =
        active.id === "all"
            ? opportunities
            : opportunities.filter((i) => i.status === active.id);

    // TODO: on change update swiper to start at the index of the first slide

    useEffect(() => {}, [active]);

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
                {filteredOpportunities?.map((opportunity, index) => (
                    <swiper-slide key={index} class="m-1">
                        <ClientOpportunityCard {...opportunity} />
                    </swiper-slide>
                ))}
            </swiper-container>
        </section>
    );
};

export default ProjectsTabs;
