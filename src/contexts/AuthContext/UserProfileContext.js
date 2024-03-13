import { createContext, useContext, useState } from 'react';

const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);

  const login = (userData) => {
    setUserProfile(userData);
  };

  const logout = () => {
    setUserProfile(null);
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
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};
