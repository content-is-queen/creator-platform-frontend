import { createContext, useContext, useState } from "react";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <UserContext.Provider
      value={{
        user: user,
        setUser: setUser,
        loading: loading,
        setLoading: setLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const { user, setUser, loading, setLoading } = useContext(UserContext);
  return { user, setUser, loading, setLoading };
};
