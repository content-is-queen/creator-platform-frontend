"use client";

import { useState, useEffect, useRef } from "react";
import debounce from "debounce";

import useOpportunities from "@/hooks/useOpportunities";

import Search from "@/components/Search";
import OpportunityCard from "@/components/OpportunityCard";
import Spinner from "../Spinner";
import Text from "../Text";

const OpportunitiesSearch = () => {
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [isInView, setIsInView] = useState(false);

  const {
    opportunities,
    loading,
    setOpportunities,
    getOpportunities,
    refetching,
  } = useOpportunities();
  const listRef = useRef();

  const checkInView = () => {
    if (!listRef.current) return;
    const { bottom } = listRef.current.getBoundingClientRect();
    const { innerHeight } = window;

    setIsInView(bottom > 0 && bottom < innerHeight - 100);
  };

  const getMoreOpportunities = async () => {
    await getOpportunities((data) =>
      setOpportunities((prev) => [...prev, ...data])
    );
  };

  useEffect(() => {
    if (opportunities) {
      setFilteredOpportunities(opportunities);
    }

    document.addEventListener("scroll", checkInView);
    return () => {
      document.removeEventListener("scroll", checkInView);
    };
  }, [opportunities]);

  useEffect(() => {
    if (listRef.current && isInView) {
      const debounced = debounce(async () => await getMoreOpportunities(), 500);
      debounced();
    }
  }, [isInView]);

  return (
    <>
      <Search
        data={opportunities}
        filteredData={filteredOpportunities}
        setFilteredData={setFilteredOpportunities}
        filter={{ keys: ["title", "description"], tag: "type" }}
      />

      {loading ? (
        <div className="text-center flex items-center justify-center h-44">
          <Spinner className="h-8 w-8 mt-5 inline-block" />
        </div>
      ) : (
        <div className="py-12 space-y-4 min-h-80" ref={listRef}>
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
        </div>
      )}

      {refetching && (
        <div className="text-center h-20 ">
          <Spinner className="h-6 w-6 mt-5 inline-block" />
        </div>
      )}
    </>
  );
};

export default OpportunitiesSearch;
