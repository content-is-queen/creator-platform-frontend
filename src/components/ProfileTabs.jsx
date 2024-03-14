"use client";

import { useState, useEffect } from "react";

import Section from "./Section";
import Tabs from "./Tabs";
import clsx from "clsx";

const OPTIONS = [
  {
    label: "Showcase",
    id: "brand",
    children: <>External</>,
  },
  {
    label: "Credits",
    id: "credits",
    children: <>A list of credits</>,
  },
  { label: "Reviews", id: "reviews", children: <>Reviews from brands</> },
];

const ProfileTabs = () => {
  const [active, setActive] = useState(OPTIONS[0].id);
  const COMPONENT = OPTIONS.find(({ id }) => id === active).children;

  useEffect(() => {}, [active]);

  return (
    <Section
      size="4xl"
      className={clsx(active === "credits" && "bg-queen-orange text-white")}
    >
      <Tabs
        options={OPTIONS}
        active={active}
        setActive={setActive}
        {...(active === "credits" ? { light: true } : null)}
      />
      <div className="py-14">{COMPONENT}</div>
    </Section>
  );
};

export default ProfileTabs;
