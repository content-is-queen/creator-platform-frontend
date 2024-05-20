import { auth } from "@/firebase.config";
import API from "@/api/api";
import { useUser } from "@/context/UserContext";
import { getUserProfile } from "@/context/UserContext";

const useAuth = () => {
  const { setUser } = useUser();

  const signup = async (data, id) => {
    try {
      const response = await API.post(
        "/auth/signup",
        { ...data, role: id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  const logout = async () => {
    try {
      auth.signOut();
      localStorage.removeItem("userProfile");

      setUser(null);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return { logout, signup, getUserProfile };
};

export default useAuth;
