"use client";

import API from "@/api/api";
import { useState, useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import debounce from "debounce";

import OpportunityCard from "@/components/OpportunityCard";
import Spinner from "../Spinner";
import Text from "../Text";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import AdminOpportunitiesTable from "@/components/Admin/AdminOpportunitiesTable";

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

        const currentDate = new Date();

        return data.message.opportunities.filter((i) => {
          const deadline = new Date(i.deadline);

          return deadline > currentDate;
        });
      },
      initialPageParam: 0,
      getPreviousPageParam: (firstPage) => firstPage.previousId,
      getNextPageParam: (lastPage) => lastPage.nextId,
      staleTime: 12000,
    });

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
      const debounced = debounce(() => fetchNextPage(), 100);
      debounced();
    }
  }, [inView, fetchNextPage]);

  const noOpenOpportunities = data?.pages?.every((page) => page.length === 0);

  return (
    <>
      {!data ? (
        <div className="text-center flex items-center justify-center h-44">
          <Spinner className="h-8 w-8 mt-5 inline-block" />
        </div>
      ) : (
        <div className="py-12 space-y-4 min-h-80" ref={listRef}>
          {!noOpenOpportunities ? (
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
            <Container size="6xl" className="mt-10 text-center space-y-6">
              <Heading>Opportunities</Heading>
              <Text className="text-center" size="xl">
                There are currently no open opportunities
              </Text>
            </Container>
          )}
        </div>
      )}
    </>
  );
};

export default OpportunitiesSearch;
