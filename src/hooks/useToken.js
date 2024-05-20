import { useState, useEffect } from "react";
import { auth } from "@/firebase.config";
import { useUser } from "@/context/UserContext";

const useToken = () => {
  const [token, setToken] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setToken(token);
      } else {
        setToken(null);
      }
    });
  }, [user]);

  return { token };
};

export default useToken;
