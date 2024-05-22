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

    // Function to check if an email exists
    const checkEmailExists = async (email) => {
      try {
        const response = await API.get(`/auth/check-email?email=${email}`);
        return response.data.exists; // Assuming the response contains { exists: true/false }
      } catch (error) {
        console.error("Error checking email existence:", error);
        return false; 
      }
    };

  return { logout, signup, getUserProfile, checkEmailExists  };
};

export default useAuth;
