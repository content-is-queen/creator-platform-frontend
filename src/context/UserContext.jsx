"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth, db } from "@/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (!authUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      setUser({
        uid: authUser.uid,
        email: authUser.email,
      });

      try {
        const snap = await getDoc(doc(db, "users", authUser.uid));
        if (snap.exists()) {
          setUser((prev) => ({
            ...prev,
            ...snap.data(),
          }));
        }
      } catch (err) {
        console.error("Failed to fetch user profile", err);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = useMemo(
    () => ({ user, setUser, loading }),
    [user, setUser, loading]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
