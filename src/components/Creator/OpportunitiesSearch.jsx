"use client";
import { useEffect, useState } from "react";
import Search from "@/components/Search";
import OpportunityCard from "@/components/OpportunityCard";

const OpportunitiesSearch = ({ opportunities }) => {
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // Load initial opportunities
    setFilteredOpportunities(opportunities);
  }, [opportunities]);

  // Function to load more opportunities
  const loadMoreOpportunities = () => {
    // Check if more opportunities can be loaded
    if (!hasMore || loading) return;
    setLoading(true);

    // Simulated API call for fetching more opportunities
    setTimeout(() => {
      // Here, you can replace this with your actual API call to fetch more opportunities
      const additionalOpportunities = []; // Replace this with your logic to fetch more opportunities
      setFilteredOpportunities((prevOpportunities) => [
        ...prevOpportunities,
        ...additionalOpportunities,
      ]);

      // Set hasMore to false if there are no more opportunities
      if (additionalOpportunities.length === 0) {
        setHasMore(false);
      }

      setLoading(false);
    }, 1000); // Simulated delay
  };

  // Function to handle scroll event
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      loadMoreOpportunities();
    }
  };

  // Attach scroll event listener when component mounts
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Search
        opportunities={opportunities}
        setFilteredOpportunities={setFilteredOpportunities}
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
        {loading && (
          <div className="text-center">
            <div className="spinner"></div>
          </div>
        )}
        {!loading && !hasMore && (
          <div className="text-center">No more opportunities</div>
        )}
      </div>
    </>
  );
};

export default OpportunitiesSearch;
