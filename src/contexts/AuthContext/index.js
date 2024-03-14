import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'firebase/firebase';
import { useRouter } from 'next/router';

const AuthContext = React.createContext();

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const initializeUser = async (user) => {
    if (user) {
      setCurrentUser({ ...user });
      setIsLoggedIn(true);
    } else {
      setCurrentUser(null);
      setIsLoggedIn(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push('/login');
    }
  }, [loading, isLoggedIn, router]);

  const value = {
    currentUser,
    isLoggedIn,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
