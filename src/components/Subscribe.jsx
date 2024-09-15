import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { useUser } from "@/context/UserContext";
import API from "@/api/api";

const Subscribe = () => {
  const { user, setUser } = useUser();

  const searchParams = useSearchParams();

  const subscribe = async (sessionId) => {
    try {
      const {
        data: { subscriptionId },
      } = await API.post(
        "/payments/subscribe",
        { sessionId, userId: user.uid },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        }
      );
      setUser({ ...user, subscribed: true, subscriptionId });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const sessionId = searchParams.get("sessionId");
    if (sessionId && token && user) {
      subscribe(sessionId);
    }
  }, [token, user]);
  return <></>;
};

export default Subscribe;
