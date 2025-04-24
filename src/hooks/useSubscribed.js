import { useState, useEffect } from "react";
import { auth } from "@/firebase.config";
import { useUser } from "@/context/UserContext";

const useSubscribed = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  const checkSubscribed = async () => {
    const user = auth?.currentUser;

    try {
      const { claims } = await user.getIdTokenResult(true);
      const isAdmin = /^(admin|super_admin)$/i.test(claims.role);

      setSubscribed(claims.subscribed || isAdmin);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);

    if (!user) return;
    void checkSubscribed();
  }, [user]);

  return { subscribed, loading };
};

export default useSubscribed;
