import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { useUser } from "@/context/UserContext";
import API from "@/api/api";
import useToken from "@/hooks/useToken";

const Subscribe = () => {
  const { user, setUser } = useUser();
  const token = useToken();
  const searchParams = useSearchParams();

  const subscribe = async (session_id) => {
    try {
      const response = await API.post(
        "/payments/subscribe",
        { session_id, user_id: user.uid, email: user.email },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser({ ...user, subscribed: true });
      localStorage.removeItem("userProfile");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (sessionId && user) {
      subscribe(sessionId);
    }
  }, [user]);
  return <></>;
};

export default Subscribe;
