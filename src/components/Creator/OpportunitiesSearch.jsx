"use client";

import API from "@/api/api";
import { useState, useEffect, useRef } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import debounce from "debounce";

import Search from "@/components/Search";
import OpportunityCard from "@/components/OpportunityCard";
import Spinner from "../Spinner";
import Text from "../Text";

const OpportunitiesSearch = () => {
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [isEnd, setIsEnd] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [page, setPage] = useState(0);
  const LIMIT = 10;

  const { data: opportunities } = useQuery({
    queryKey: ["opportunities", page],
    queryFn: async () => {
      const { data } = await API.get(
        `/opportunities?limit=${LIMIT}&page=${page}`
      );
      setFilteredOpportunities(data.message.opportunities);

      if (data.message.totalPages === data.message.currentPage) {
        setIsEnd(true);
      }
      return data.message.opportunities;
    },
    placeholderData: keepPreviousData,
  });

  const listRef = useRef();

  const checkInView = () => {
    if (!listRef.current) return;
    const { bottom } = listRef.current.getBoundingClientRect();
    const { innerHeight } = window;

    setIsInView(bottom > 0 && bottom < innerHeight - 100);
  };

  useEffect(() => {
    document.addEventListener("scroll", checkInView);
    return () => {
      document.removeEventListener("scroll", checkInView);
    };
  }, [opportunities]);

  useEffect(() => {
    if (listRef.current && isInView && !isEnd) {
      const debounced = debounce(() => setPage((prev) => prev + 1), 500);
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

      {!opportunities ? (
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
    </>
  );
};

export default OpportunitiesSearch;
