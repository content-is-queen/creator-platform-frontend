"use client";

import { createContext, useContext, useState } from "react";
import Secure from "@/utils/SecureLs";

const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  const getInitialState = () => {
    if (typeof localStorage !== "undefined") {
      return localStorage?.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null;
    }
  };

  const [userProfile, setUserProfile] = useState(getInitialState);

  const login = async (user) => {
    try {
      const token = await user.getIdToken();

      const { email, photoUrl } = user;

      Secure.setToken(token);
      window.location.href = "/";
      setUserProfile({ email: email, photoUrl: photoUrl, role: "creator" });
      sessionStorage.setItem(
        "user",
        JSON.stringify({ email: email, photoUrl: photoUrl, role: "creator" })
      );
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    try {
      Secure.removeToken();
      setUserProfile(null);
      sessionStorage.removeItem("user");
      window.location.href = "/login";
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <UserProfileContext.Provider value={{ userProfile, login, logout }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }
  return context;
};
