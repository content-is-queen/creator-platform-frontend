"use client";

import { useEffect, useRef, useState } from "react";

import Search from "@/components/Search";
import OpportunityCard from "@/components/OpportunityCard";

const OpportunitiesSearch = ({ opportunities }) => {
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);

  useEffect(() => {
    setFilteredOpportunities(opportunities);
  }, []);

  return (
    <>
      <Search
        opportunities={opportunities}
        setFilteredOpportunities={setFilteredOpportunities}
      />

      <div className="my-12 space-y-6">
        {opportunities.length > 0 ? (
          filteredOpportunities?.map((opportunity) => (
            <div key={opportunity.opportunity_id}>
              <OpportunityCard {...opportunity} />
            </div>
          ))
        ) : (
          <div className="text-center">No opportunities found</div>
        )}
      </div>
    </>
  );
};

export default OpportunitiesSearch;
