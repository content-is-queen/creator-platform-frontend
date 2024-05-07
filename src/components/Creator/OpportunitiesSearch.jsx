"use client";
import { useEffect, useRef, useState } from "react";
import Search from "@/components/Search";
import OpportunityCard from "@/components/OpportunityCard";

const OpportunitiesSearch = ({ opportunities }) => {
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);

  useEffect(() => {
    setFilteredOpportunities(opportunities.slice(0, page * 10));
  }, [opportunities, page]);

  const handleScroll = () => {
    if (loaderRef.current && loaderRef.current.getBoundingClientRect().top < window.innerHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Simulated API call with setTimeout
      setTimeout(() => {
        setFilteredOpportunities((prevOpportunities) => [
          ...prevOpportunities,
          ...opportunities.slice((page - 1) * 10, page * 10),
        ]);
        setLoading(false);
      }, 1000); // Adjust this timeout as needed
    };

    if (page > 1) {
      fetchData();
    }
  }, [page]);

  return (
    <>
      <Search
        opportunities={opportunities}
        setFilteredOpportunities={setFilteredOpportunities}
      />
      <div className="my-12 space-y-6">
        {filteredOpportunities.length > 0 ? (
          <>
            {filteredOpportunities.map((opportunity) => (
              <div key={opportunity.opportunity_id}>
                <OpportunityCard {...opportunity} />
              </div>
            ))}
            {loading && (
              <div className="text-center">
                <div className="loader"></div>
              </div>
            )}
            <div ref={loaderRef}></div>
          </>
        ) : (
          <div className="text-center">No opportunities found</div>
        )}
      </div>
    </>
  );
};

export default OpportunitiesSearch;
