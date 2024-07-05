import API from "@/api/api";
import { useEffect, useState } from "react";

const useOpportunities = (args, cb) => {
  const [opportunities, setOpportunities] = useState([]);
  const [startAfterId, setStartAfterId] = useState(null);
  const [limit] = useState(4);
  const [loading, setLoading] = useState(true);
  const [refetching, setRefetching] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  let path = [
    `/opportunities?limit=${limit}`,
    startAfterId ? `&startAfter=${startAfterId}` : "",
  ].join("");

  if (args?.opportunityId) {
    path = `/opportunities/opportunityid/${args.opportunityId}`;
  }

  if (args?.userId) {
    path = `/opportunities/id/${args.userId}`;
  }

  const getOpportunities = async (cb) => {
    if (isEnd) return;

    try {
      if (!loading) {
        setRefetching(true);
      }

      const { data } = await API.get(path);

      const opportunities =
        data.message?.opportunities || data?.opportunities || data;

      if (cb) {
        cb(opportunities);
      } else {
        setOpportunities(opportunities);
      }

      if (!args) {
        setStartAfterId(
          opportunities.length === limit ? data.message.nextStartAfterId : null
        );
      }

      if (opportunities.length < limit) {
        setIsEnd(true);
      }
    } catch (err) {
      console.error(err);
      if (err.response.status === 404) {
        setIsEnd(true);
      }
    } finally {
      setLoading(false);
      setRefetching(false);
    }
  };

  useEffect(() => {
    (async (cb) => {
      await getOpportunities(cb);
    })(cb);
  }, []);
  return {
    opportunities,
    setOpportunities,
    loading,
    setLoading,
    startAfterId,
    setStartAfterId,
    getOpportunities,
    refetching,
  };
};

export default useOpportunities;
