"use client";

import { useState } from "react";

import Search from "@/components/Search";
import OpportunityCard from "@/components/OpportunityCard";

const OpportunitiesSearch = ({ opportunities }) => {
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);

  return (
    <>
      <Search
        data={opportunities}
        filteredData={filteredOpportunities}
        setFilteredData={setFilteredOpportunities}
        filter={{ keys: ["title", "project", "name"], tag: "type" }}
      />

      <div className="my-12 space-y-6">
        {filteredOpportunities.length > 0 ? (
          filteredOpportunities.map((opportunity) => (
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
