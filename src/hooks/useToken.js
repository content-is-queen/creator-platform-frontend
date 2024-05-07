import { useState, useEffect } from "react";
import { auth } from "@/firebase.config";
import { getIdToken } from "firebase/auth";

const useToken = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    (async () => {
      const user = auth.currentUser;

      if (user) {
        const token = await getIdToken(user);
        setToken(token);
      }
    })();
  }, []);

  return { token };
};

export default useToken;
