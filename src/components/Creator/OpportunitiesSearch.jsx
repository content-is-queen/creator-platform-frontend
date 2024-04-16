"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

import Search from "@/components/Search";

const OpportunityCard = dynamic(() => import("@/components/OpportunityCard"), {
  ssr: false,
});

const OpportunitiesSearch = ({ opportunities }) => {
  const ref = useRef();
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);

  useEffect(() => {
    setFilteredOpportunities(opportunities);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(ref.current);
          ref.current.load();
        }
      });

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    });
  }, [ref]);

  return (
    <>
      <Search
        opportunities={opportunities}
        setFilteredOpportunities={setFilteredOpportunities}
      />

      <div className="my-12 space-y-6">
        {filteredOpportunities?.map((opportunity) => (
          <div key={opportunity.opportunity_id} ref={ref}>
            <OpportunityCard {...opportunity} />
          </div>
        ))}
      </div>
    </>
  );
};

export default OpportunitiesSearch;
