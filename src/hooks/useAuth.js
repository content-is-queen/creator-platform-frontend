import { useState, useEffect } from "react";
import API from "@/api/api";
import { auth } from "@/firebase.config";
import { useUser } from "@/context/UserContext";

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [subscribed, setSubscribed] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        const idTokenResult = await user.getIdTokenResult(true);

        const {
          data: { subscriptionId },
        } = await API.get("/payments/info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSubscribed(
          subscriptionId ||
            idTokenResult.claims.role === "admin" ||
            idTokenResult.claims.role === "super_admin"
        );
        setToken(token);
      } else {
        setToken(null);
      }
    });
  }, [user]);

  return { token, subscribed };
};

export default useAuth;
