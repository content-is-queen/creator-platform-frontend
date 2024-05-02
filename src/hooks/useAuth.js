import { useRouter } from "next/navigation";
import {
  onIdTokenChanged,
  signInWithEmailAndPassword,
  getIdToken,
} from "firebase/auth";
import { useEffect } from "react";
import { auth } from "@/firebase.config";
import { useUser } from "@/context/UserContext";
import API from "@/api/api";

const useAuth = () => {
  const router = useRouter();
  const { user, setUser, loading, setLoading } = useUser();

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        const { email, displayName, photoUrl } = user;
        const userProfile = await getUserProfile();

        setUser({
          email,
          displayName,
          photoUrl,
          role: "creator",
          ...userProfile,
        });

        setLoading(false);
      }

      return () => {
        unsubscribe();
      };
    });
  }, [loading]);

  const getUserProfile = async () => {
    const user = auth.currentUser;
    const token = await getIdToken(user);

    try {
      const response = await API.get("/auth/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.message;
    } catch (error) {
      return error.response?.data;
    }
  };

  const signup = async (data, role) => {
    try {
      await API.post("/auth/signup", {
        ...data,
        role: role,
      });
      router.push("/verify");
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  const signin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = async () => {
    try {
      auth.signOut();
      router.push("/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return { user, logout, signin, signup };
};

export default useAuth;
