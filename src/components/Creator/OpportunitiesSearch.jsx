"use client";

import API from "@/api/api";
import { useState, useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import debounce from "debounce";

import Search from "@/components/Search";
import OpportunityCard from "@/components/OpportunityCard";
import Spinner from "../Spinner";
import Text from "../Text";

const OpportunitiesSearch = () => {
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [inView, setInView] = useState(false);
  const LIMIT = 10;

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["opportunities"],
      queryFn: async ({ pageParam }) => {
        const { data } = await API.get(
          `/opportunities?limit=${LIMIT}&page=${pageParam}`
        );
        setFilteredOpportunities(data.message.opportunities);

        return data.message.opportunities;
      },
      initialPageParam: 0,
      getPreviousPageParam: (firstPage) => firstPage.previousId,
      getNextPageParam: (lastPage) => lastPage.nextId,
    });

  console.log(data);
  console.log(hasNextPage);

  const listRef = useRef();

  const checkInView = () => {
    if (!listRef.current) return;
    const { bottom } = listRef.current.getBoundingClientRect();
    const { innerHeight } = window;

    setInView(bottom > 0 && bottom < innerHeight - 100);
  };

  useEffect(() => {
    document.addEventListener("scroll", checkInView);
    return () => {
      document.removeEventListener("scroll", checkInView);
    };
  }, []);

  useEffect(() => {
    if (listRef.current && inView && !isFetchingNextPage && hasNextPage) {
      const debounced = debounce(() => fetchNextPage(), 500);
      debounced();
    }
  }, [inView, fetchNextPage]);

  return (
    <>
      <Search
        data={data?.pages}
        filteredData={filteredOpportunities}
        setFilteredData={setFilteredOpportunities}
        filter={{ keys: ["title", "description"], tag: "type" }}
      />

      {!data ? (
        <div className="text-center flex items-center justify-center h-44">
          <Spinner className="h-8 w-8 mt-5 inline-block" />
        </div>
      ) : (
        <div className="py-12 space-y-4 min-h-80" ref={listRef}>
          {data.pages.length > 0 ? (
            <>
              {data.pages.map((page) =>
                page.map((opportunity) => (
                  <div key={opportunity.opportunityId}>
                    <OpportunityCard {...opportunity} />
                  </div>
                ))
              )}
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
