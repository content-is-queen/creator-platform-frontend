"use client";

import { useState, useEffect } from "react";

import Section from "../../Section";
import Tabs from "../../Tabs";
import Showcase from "./Showcase";
import Credits from "./Credits";

const CreatorProfileTabs = ({ meta }) => {
  const OPTIONS = [
    {
      label: "Showcase",
      id: "showcase",
      children: <Showcase meta={meta} />,
    },
    {
      label: "Credits",
      id: "credits",
      theme: "orange",
      children: <Credits meta={meta} />,
    },
  ];

  const [active, setActive] = useState(OPTIONS[0]);

  useEffect(() => {}, [active]);

  return (
    <Section size="4xl" {...(active?.theme ? { theme: active.theme } : null)}>
      <Tabs options={OPTIONS} active={active} setActive={setActive} />
      <div className="py-14">{active.children}</div>
    </Section>
  );
};

export default CreatorProfileTabs;
