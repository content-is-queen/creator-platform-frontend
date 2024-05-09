import { useState, useEffect } from "react";
import { auth } from "@/firebase.config";
import { getIdToken } from "firebase/auth";
import { useUser } from "@/context/UserContext";

const useToken = () => {
  const [token, setToken] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    (async () => {
      const user = auth.currentUser;

      if (user) {
        const token = await getIdToken(user);
        setToken(token);
      }
    })();
  }, [user]);

  return { token };
};

export default useToken;
