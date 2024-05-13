import API from "@/api/api";
import { useUser } from "@/context/UserContext";
import { getUserProfile } from "@/context/UserContext";

const useAuth = () => {
  const { setUser } = useUser();

  const signup = async (data, id) => {
 await API("/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, role: id }),
      });
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

  return { logout, signin, signup, getUserProfile };
};

export default useAuth;
