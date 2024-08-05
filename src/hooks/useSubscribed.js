import checkSubscribed from "@/helpers/checkSubscribed";
import { useState, useEffect } from "react";

const useSubscribed = () => {
  const [subscribed, setSubscribed] = useState(true);

  useEffect(() => {
    (async () => {
      setSubscribed(await checkSubscribed());
    })();
  }, []);

  return subscribed;
};

export default useSubscribed;
