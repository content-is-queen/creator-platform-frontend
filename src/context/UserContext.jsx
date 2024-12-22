import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth, db } from "@/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const UserContext = createContext(null);

export const getUser = async (user) => {
  if (localStorage.getItem("user"))
    return JSON.parse(localStorage.getItem("user"));

  const snapshot = await getDoc(doc(db, "users", user.uid));

  const userProfile = snapshot.data();

  localStorage.setItem("user", JSON.stringify(userProfile));

  return userProfile;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const user = await getUser(authUser);

        if (user) {
          setUser(user);
        }

        setLoading(false);
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={useMemo(
        () => ({ user, setUser, loading }),
        [user, setUser, loading]
      )}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const { user, setUser, loading } = useContext(UserContext);
  return { user, setUser, loading };
};
