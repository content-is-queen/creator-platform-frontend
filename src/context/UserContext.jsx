import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/firebase.config";
import { getIdToken, onAuthStateChanged } from "firebase/auth";
import API from "@/api/api";

export const UserContext = createContext(null);

export const getUserProfile = async (args) => {
  const token = args?.token ? args.token : await getIdToken(args.user);

  if (localStorage.getItem("userProfile"))
    return JSON.parse(localStorage.getItem("userProfile"));

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

    throw new Error("There was an error getting your profile");
  } catch (error) {
    console.error(error.response.data);
    return null;
  }
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const token = await authUser.getIdToken(true);

        if (token) {
          const userProfile = await getUserProfile({ token });

          if (userProfile) {
            setUser(userProfile);
          }
        }

        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("userProfile", JSON.stringify(user));
    } else {
      localStorage.removeItem("userProfile");
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
