import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/firebase.config";
import { getIdToken, onAuthStateChanged } from "firebase/auth";
import API from "@/api/api";

export const UserContext = createContext(null);

export const getUserProfile = async () => {
  const user = auth.currentUser;
  const token = await getIdToken(user);

  try {
    const response = await API("/auth/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.message;
  } catch (error) {
    return error.response?.data;
  }
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        let userProfile;

        if (localStorage.getItem("userProfile")) {
          userProfile = JSON.parse(localStorage.getItem("userProfile"));
        } else {
          userProfile = await getUserProfile();
          localStorage.setItem("userProfile", JSON.stringify(userProfile));
        }

        setUser({
          email: user.email,
          displayName: user.displayName,
          imageUrl: user.imageUrl,
          ...userProfile,
        });
      } else {
        localStorage.removeItem("userProfile");
        setUser(null);
      }
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        user: user,
        setUser: setUser,
        loaded: loaded,
        setLoaded: setLoaded,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const { user, setUser, loaded, setLoaded } = useContext(UserContext);
  return { user, setUser, loaded, setLoaded };
};
