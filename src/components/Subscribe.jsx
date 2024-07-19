import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { useUser } from "@/context/UserContext";
import API from "@/api/api";
import useAuth from "@/hooks/useAuth";

const Subscribe = () => {
  const { user, setUser } = useUser();
  const { token } = useAuth();
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
            Authorization: `Bearer ${token}`,
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
    if (sessionId && user) {
      subscribe(sessionId);
    }
  }, [user]);
  return <></>;
};

export default Subscribe;
