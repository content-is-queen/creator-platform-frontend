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
      },
    });

    if (response.status === 200) {
      return response.data;
    }

    throw new Error("Something went wrong when getting the users profile");
  } catch (error) {
    console.error(error);
  }
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        let userProfile;
        const token = await authUser.getIdToken(true);

        if (token) {
          if (localStorage.getItem("userProfile")) {
            userProfile = JSON.parse(localStorage.getItem("userProfile"));
          } else {
            userProfile = await getUserProfile({ token });
            if (userProfile) {
              localStorage.setItem("userProfile", JSON.stringify(userProfile));
            }
          }

          setUser({
            email: authUser.email,
            ...userProfile,
          });
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
