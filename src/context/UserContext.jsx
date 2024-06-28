import { createContext, useContext, useEffect, useState } from "react";
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
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
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
        const token = await authUser.getIdToken(true);
        if (token) {
          const user = await getUser({ token });

          if (user) {
            setUser(user);
          }
        }

        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const { user, setUser, loading } = useContext(UserContext);
  return { user, setUser, loading };
};
