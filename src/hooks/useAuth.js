import { useState, useEffect } from "react";
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

        setSubscribed(
          idTokenResult.claims.subscribed ||
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
