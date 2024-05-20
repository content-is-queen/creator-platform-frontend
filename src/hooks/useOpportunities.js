import API from "@/api/api";
import { useEffect, useState } from "react";

const useOpportunities = (args, cb) => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setError] = useState({});

  let path = "/opportunities";

  if (args?.opportunity_id) {
    path = `/opportunities/opportunityid/${args.opportunity_id}`;
  }

  if (args?.user_id) {
    path = `/opportunities/id/${args.user_id}`;
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
        setOpportunities(data);
      } catch (err) {
        setError({ message: "There was a problem getting opportunities" });
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return [opportunities, setOpportunities, loading, setLoading];
};

export default useOpportunities;
