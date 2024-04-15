import isAuth from "@/helpers/isAuth";
import { useRouter } from "next/navigation";
import { doSignOut } from "@/firebase/auth";
import Secure from "@/utils/SecureLs";

const useAuth = () => {
  const router = useRouter();
  const user = isAuth();

  const login = async (user) => {
    try {
      const token = await user.getIdToken(/* forceRefresh */ true);
      Secure.setToken(token);
      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = async () => {
    try {
      await doSignOut();
      Secure.removeToken();
      router.push("/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return { user, logout, login };
};

export default useAuth;
