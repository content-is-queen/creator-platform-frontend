import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth } from "@/firebase.config";
import { getIdToken, onAuthStateChanged } from "firebase/auth";
import API from "@/api/api";

export const UserContext = createContext(null);

export const getUser = async (args) => {
  const token = args?.token ? args.token : await getIdToken(args.user);

  if (localStorage.getItem("user"))
    return JSON.parse(localStorage.getItem("user"));

  try {
    const response = await API.get("/auth/user", {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    }

    auth.signOut();

    throw new Error("There was an error getting your profile");
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const user = await getUser({
          token: JSON.parse(localStorage.getItem("token")),
        });

        if (user) {
          setUser(user);
        }

        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
        localStorage.removeItem("user");
      }
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
