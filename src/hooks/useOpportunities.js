import API from "@/api/api";
import { useEffect, useState } from "react";

const useOpportunities = (args, cb) => {
  const [opportunities, setOpportunities] = useState([]);
  const [startAfterId, setStartAfterId] = useState("");
  const [loading, setLoading] = useState(true);
  const [errors, setError] = useState({});

  let path = "/opportunities?limit=0";

  if (args?.opportunityId) {
    path = `/opportunities/opportunityid/${args.opportunityId}`;
  }

  if (args?.userId) {
    path = `/opportunities/id/${args.userId}`;
  }

  useEffect(() => {
    (async () => {
      setError({});
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
        setError({ message: "There was a problem getting opportunities" });
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return {
    opportunities,
    setOpportunities,
    loading,
    setLoading,
    startAfterId,
    setStartAfterId,
  };
};

export default useOpportunities;
