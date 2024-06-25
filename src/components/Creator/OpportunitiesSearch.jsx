"use client";

import { useState, useEffect } from "react";

import API from "@/api/api";

import Search from "@/components/Search";
import OpportunityCard from "@/components/OpportunityCard";
import Spinner from "../Spinner";
import Text from "../Text";

const OpportunitiesSearch = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await API.get("/opportunities?limit=0");
        setOpportunities(data.message.opportunities);
        setFilteredOpportunities(data.message.opportunities);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <Search
        data={opportunities}
        filteredData={filteredOpportunities}
        setFilteredData={setFilteredOpportunities}
        filter={{ keys: ["title", "project", "name"], tag: "type" }}
      />

      <div className="my-12 space-y-6">
        {loading ? (
          <div className="text-center">
            <Spinner className="h-8 w-8 mt-5 inline-block" />
          </div>
        ) : (
          <>
            {filteredOpportunities?.length > 0 ? (
              <>
                {filteredOpportunities.map((opportunity) => (
                  <div key={opportunity.opportunityId}>
                    <OpportunityCard {...opportunity} />
                  </div>
                ))}
              </>
            ) : (
              <Text className="text-center">There are no opportunities</Text>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default OpportunitiesSearch;
