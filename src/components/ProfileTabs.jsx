"use client";

import { useState, useEffect } from "react";

import Section from "./Section";
import Tabs from "./Tabs";

const OPTIONS = [
    {
        label: "Showcase",
        id: "showcase",
        children: <>External</>,
    },
    {
        label: "Credits",
        id: "credits",
        theme: "orange",
        children: <>A list of credits</>,
    },
    { label: "Reviews", id: "reviews", children: <>Reviews from brands</> },
];

const ProfileTabs = () => {
    const [active, setActive] = useState(OPTIONS[0]);

    useEffect(() => {}, [active]);

    return (
        <Section
            size="4xl"
            {...(active?.theme ? { theme: active.theme } : null)}
        >
            <Tabs options={OPTIONS} active={active} setActive={setActive} />
            <div className="py-14">{active.children}</div>
        </Section>
    );
};

export default ProfileTabs;
