import API from "@/api/api";
import { useEffect, useState } from "react";

const useOpportunities = (args, cb) => {
  const [opportunities, setOpportunities] = useState([]);
  const [startAfterId, setStartAfterId] = useState(null);
  const [limit] = useState(3);
  const [loading, setLoading] = useState(true);
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
      setLoading(true);
      const { data } = await API.get(path);
      if (cb) {
        cb(data);
        return;
      }
      setOpportunities(
        data.message?.opportunities || data?.opportunities || data
      );
      setStartAfterId(data.message.nextStartAfterId);
    } catch (err) {
      console.error(err);
      if (err.response.data.status === 404) {
        setIsEnd(true);
      }
    } finally {
      setLoading(false);
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
  };
};

export default useOpportunities;
