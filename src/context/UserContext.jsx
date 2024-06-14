import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/firebase.config";
import { getIdToken, onAuthStateChanged } from "firebase/auth";
import API from "@/api/api";

export const UserContext = createContext(null);

export const getUserProfile = async (args) => {
  const token = args?.token ? args.token : await getIdToken(args.user);

  try {
    const response = await API.get("/auth/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      console.log(response.data);
      localStorage.setItem("userProfile", JSON.stringify(response.data));
      return response.data;
    }

    throw new Error("There was an error getting your account");
  } catch (error) {
    console.error(error);
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
          const userProfile = localStorage.getItem("userProfile")
            ? JSON.parse(localStorage.getItem("userProfile"))
            : await getUserProfile({ token });

          if (userProfile) {
            setUser(userProfile);
          }
        }

        setLoading(false);
      } else {
        localStorage.removeItem("userProfile");
        setUser(null);
        setLoading(false);
      }
    });
  }, []);

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
