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
    <Section size="4xl" {...(active?.theme ? { theme: active.theme } : null)}>
      <Tabs options={OPTIONS} active={active} setActive={setActive} />
      <div className="py-14">
        {active.id === "showcase" && (
          <>

            <iframe
  style={{ width: "100%", maxWidth: "660px", borderRadius: "5px", marginTop: "20px", border: "1px solid #ccc" }}
  src="https://open.spotify.com/embed/episode/1ml8HwUk5JAzPgAxsZvgkQ?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
            <iframe
  style={{ width: "100%", maxWidth: "660px", borderRadius: "5px", marginTop: "50px", border: "1px solid #ccc" }}
  src="https://podomatic.com/embed/html5/episode/9588535"
              height="208"
              width="504"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              scrolling="no"
              allowFullScreen=""
            />

<iframe
  title="Taming the apocalypse by partnering with new species, with Shane Simonsen"
  allowtransparency="true"
  height="300"
  width="100%"
  style={{ width: "100%", maxWidth: "660px", borderRadius: "5px", marginTop: "50px", border: "1px solid #ccc" }}
  scrolling="no"
  data-name="pb-iframe-player"
  src="https://www.podbean.com/player-v2/?from=embed&pbad=0&i=nsd6j-15f5537-pb&square=1&share=1&download=1&fonts=Arial&skin=8bbb4e&font-color=000000&rtl=0&logo_link=episode_page&btn-skin=1b1b1b&size=300"
  loading="lazy"
  allowfullscreen=""
/>

<iframe allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" 
frameborder="0" height="175"
style={{ width: "100%", maxWidth: "660px", borderRadius: "5px", marginTop: "50px", border: "1px solid #ccc" }}
sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" 
 src="https://embed.podcasts.apple.com/us/podcast/ronald-reagans-d-day-commemoration/id1527280716?i=1000583924685"
 
/>
                        
          </>
        )}
        {active.id === "credits" && (
          <div>A list of credits</div>
        )}
        {active.id === "reviews" && (
          <div>Reviews from brands</div>
        )}
      </div>
    </Section>
  );
};

export default ProfileTabs;
